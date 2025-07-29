import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../App.css'; // Assuming App.css contains necessary styles

// Custom useInterval hook to prevent frequent re-renders of setInterval
function useInterval(callback, delay) {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]); // Only update if the callback itself changes

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]); // Only restart interval if delay changes
}

const UltimateTacticalAgentGame = () => {
    // --- CONSTANTS ---
    const GRID_SIZE = 8;
    const GAME_DURATION = 120;
    const INITIAL_LIVES = 5; // Reduced initial lives for balancing, will be modified by difficulty
    const BASE_PISTOL = { type: 'pistol', emoji: '🔫', damage: 1, range: 'line', speed: 300, description: 'Standard sidearm', color: '#6b7280', rarity: 'common' };

    const LEVEL_THEMES = [
        { name: 'Urban Warfare', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', cellColor: '#2d3748', cellBorder: '#4a5568', adjacentColor: '#2b6cb0', playerColor: '#3182ce', threatColor: '#e53e3e', bulletColor: '#fbbf24', hazardColor: '#f97316' },
        { name: 'Desert Operations', background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 50%, #fb923c 100%)', cellColor: '#92400e', cellBorder: '#b45309', adjacentColor: '#d97706', playerColor: '#1e40af', threatColor: '#dc2626', bulletColor: '#f59e0b', hazardColor: '#ef4444' },
        { name: 'Arctic Infiltration', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)', cellColor: '#1e3a8a', cellBorder: '#3730a3', adjacentColor: '#1d4ed8', playerColor: '#1e40af', threatColor: '#dc2626', bulletColor: '#f59e0b', hazardColor: '#7c3aed' },
        { name: 'Space Station Alpha', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', cellColor: '#4c1d95', cellBorder: '#5b21b6', adjacentColor: '#6d28d9', playerColor: '#8b5cf6', threatColor: '#ef4444', bulletColor: '#fbbf24', hazardColor: '#ec4899' }
    ];

    const WEAPON_TYPES = [
        BASE_PISTOL, // Base weapon
        { type: 'machinegun', emoji: '🪖', damage: 1, range: 'line', speed: 100, description: 'Rapid automatic fire', color: '#dc2626', rarity: 'common', duration: 8000 },
        { type: 'shotgun', emoji: '💥', damage: 2, range: 'spread', speed: 400, description: 'Close-range devastation', color: '#f97316', rarity: 'uncommon', duration: 10000 },
        { type: 'sniper', emoji: '🎯', damage: 3, range: 'piercing', speed: 600, description: 'Long-range precision', color: '#10b981', rarity: 'rare', duration: 12000 },
        { type: 'rocket', emoji: '🚀', damage: 4, range: 'explosive', speed: 500, description: 'Area destruction', color: '#ef4444', rarity: 'epic', duration: 15000 },
        { type: 'laser', emoji: '⚡', damage: 2, range: 'beam', speed: 100, description: 'Energy weapon', color: '#8b5cf6', rarity: 'rare', duration: 10000 }
    ];

    const POWERUP_TYPES = [
        { type: 'shield', emoji: '🛡️', color: '#8b5cf6', duration: 15000, description: 'Damage immunity', category: 'buff' },
        { type: 'rapidfire', emoji: '⚡', color: '#f59e0b', duration: 10000, description: '50% faster shooting', category: 'buff' },
        { type: 'multishot', emoji: '🎯', color: '#ef4444', duration: 12000, description: 'Shoot in all directions', category: 'buff' },
        { type: 'freeze', emoji: '❄️', color: '#06b6d4', duration: 8000, description: 'Freeze all enemies', category: 'buff' },
        { type: 'rage', emoji: '😡', color: '#dc2626', duration: 15000, description: 'Double damage & speed', category: 'buff' }
    ];

    const SUPER_WEAPONS = [
        { type: 'bomb', emoji: '💣', color: '#f97316', duration: 0, description: 'Massive explosion', category: 'super' },
        { type: 'nuke', emoji: '☢️', color: '#fbbf24', duration: 0, description: 'Clear entire screen', category: 'super' },
        { type: 'heal', emoji: '💚', color: '#10b981', duration: 0, description: 'Restore 2 lives', category: 'super' }
    ];

    const ENEMY_TYPES = [
        // Base values for enemies. Difficulty settings will modify these.
        // All attackType simplified to 'melee' for new damage system (no enemy bullets)
        // Adjusted base speeds and health for better balance
        { type: 'basic', emoji: '😈', health: 1, speed: 0.8, damage: 1, score: 100, color: '#dc2626', damageRadius: 1, attackCooldown: 2500, attackIndicatorColor: 'rgba(255, 0, 0, 0.3)' },
        { type: 'heavy', emoji: '🦾', health: 3, speed: 0.4, damage: 2, score: 250, color: '#374151', damageRadius: 1, attackCooldown: 3500, attackIndicatorColor: 'rgba(255, 0, 0, 0.4)' },
        { type: 'fast', emoji: '🏃‍♀️', health: 1, speed: 1.5, damage: 1, score: 150, color: '#f59e0b', damageRadius: 1, attackCooldown: 2000, attackIndicatorColor: 'rgba(255, 0, 0, 0.2)' },
        { type: 'sniper', emoji: '🔫', health: 2, speed: 0.2, damage: 1, score: 300, color: '#10b981', damageRadius: 3, attackCooldown: 4000, attackIndicatorColor: 'rgba(255, 255, 0, 0.3)' } // Sniper now has a visible range
    ];

    const MISSION_TYPES = [
        { type: 'survival', description: 'Survive for 2 minutes', icon: '⏱️', target: GAME_DURATION },
        { type: 'elimination', description: 'Eliminate 50 enemies', icon: '💀', target: 50 },
        { type: 'collection', description: 'Collect 10 power-ups', icon: '📦', target: 10 }
    ];

    // --- STATE ---
    const [gameState, setGameState] = useState('ready');
    const [playerPosition, setPlayerPosition] = useState({ x: 4, y: 4 });
    const [enemies, setEnemies] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [weaponPickups, setWeaponPickups] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [particles, setParticles] = useState([]); // Used for hit effects, explosions etc.
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('ultimateHighScore')) || 0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [lives, setLives] = useState(INITIAL_LIVES);
    const [level, setLevel] = useState(1);
    const [currentTheme, setCurrentTheme] = useState(LEVEL_THEMES[0]);
    const [activePowerUps, setActivePowerUps] = useState({}); // Example: { shield: 16788888888, rapidfire: 16788888999 }
    const [currentWeapon, setCurrentWeapon] = useState(BASE_PISTOL);
    const [currentWeaponEndTime, setCurrentWeaponEndTime] = useState(0); // For temporary weapons
    const [currentMission, setCurrentMission] = useState(MISSION_TYPES[0]);
    const [missionProgress, setMissionProgress] = useState(0);
    const [difficulty, setDifficulty] = useState('normal');
    const [enemiesKilled, setEnemiesKilled] = useState(0);
    const [lastHitTime, setLastHitTime] = useState(0);
    const [isDamaged, setIsDamaged] = useState(false);
    const [enemyAttackIndicators, setEnemyAttackIndicators] = useState([]); // To show threat areas

    // --- REFS (to get latest state in intervals to avoid stale closures) ---
    const playerPositionRef = useRef(playerPosition);
    const enemiesRef = useRef(enemies);
    const powerUpsRef = useRef(powerUps);
    const weaponPickupsRef = useRef(weaponPickups);
    const gameStateRef = useRef(gameState);
    const activePowerUpsRef = useRef(activePowerUps);
    const difficultyRef = useRef(difficulty); // To access latest difficulty in intervals
    const currentWeaponRef = useRef(currentWeapon); // For firing logic
    const livesRef = useRef(lives); // For game over check in damage
    // Update refs whenever state changes
    useEffect(() => { playerPositionRef.current = playerPosition; }, [playerPosition]);
    useEffect(() => { enemiesRef.current = enemies; }, [enemies]);
    useEffect(() => { powerUpsRef.current = powerUps; }, [powerUps]);
    useEffect(() => { weaponPickupsRef.current = weaponPickups; }, [weaponPickups]);
    useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
    useEffect(() => { activePowerUpsRef.current = activePowerUps; }, [activePowerUps]);
    useEffect(() => { difficultyRef.current = difficulty; }, [difficulty]);
    useEffect(() => { currentWeaponRef.current = currentWeapon; }, [currentWeapon]);
    useEffect(() => { livesRef.current = lives; }, [lives]);


    const audioContextRef = useRef(null);
    const soundsRef = useRef({});

    // --- AUDIO SYSTEM ---
    const playTone = useCallback((frequency, duration, type = 'sine') => {
        if (!audioContextRef.current) return;
        try {
            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);
            oscillator.start(audioContextRef.current.currentTime);
            oscillator.stop(audioContextRef.current.currentTime + duration);
        } catch (e) {
            console.error('Audio playback failed:', e);
        }
    }, []);

    useEffect(() => {
        try {
            const context = new (window.AudioContext || window['webkitAudioContext'])();
            audioContextRef.current = context;
            soundsRef.current = {
                shoot: () => playTone(800, 0.1, 'square'),
                hit: () => playTone(1200, 0.15, 'sawtooth'),
                explosion: () => playTone(200, 0.3, 'square'),
                powerup: () => playTone(1000, 0.2, 'sine'),
                damage: () => playTone(250, 0.2, 'triangle'), // Shorter, sharper damage sound
                weaponPickup: () => playTone(1500, 0.3, 'triangle'),
                gameOver: () => playTone(100, 1.0, 'sawtooth'), // Game over sound
                levelUp: () => playTone(2000, 0.2, 'sine'), // Level up sound
                enemyAttackWindup: () => playTone(400, 0.1, 'sine') // Sound for enemy preparing to attack
            };
        } catch (e) {
            console.error('Web Audio API not supported:', e);
        }
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [playTone]);

    // --- UTILITY FUNCTIONS ---
    const getDifficultySettings = useCallback(() => {
        // Tuned for easier normal mode, and more distinct easy/hard modes
        switch (difficulty) {
            case 'easy': return {
                enemyLimit: 2,      // Fewer enemies
                spawnRate: 4000,    // Slower enemy spawns
                scoreMultiplier: 0.7,
                enemyHealthMod: 0.5, // Enemies have significantly less health
                enemySpeedMod: 0.6,  // Enemies move much slower
                enemyDamageMod: 0.5, // Enemies deal much less damage
                enemyAttackCooldownMod: 1.5, // Enemies attack slower
                initialLivesMod: 1.5 // More initial lives
            };
            case 'normal': return {
                enemyLimit: 4,      // Moderate enemies
                spawnRate: 2500,    // Moderate spawn rate
                scoreMultiplier: 1.0,
                enemyHealthMod: 1.0, // Standard enemy health
                enemySpeedMod: 1.0,  // Standard enemy speed
                enemyDamageMod: 1.0, // Standard enemy damage
                enemyAttackCooldownMod: 1.0, // Standard attack speed
                initialLivesMod: 1.0 // Standard initial lives
            };
            case 'hard': return {
                enemyLimit: 7,      // More enemies
                spawnRate: 1500,    // Faster enemy spawns
                scoreMultiplier: 1.5,
                enemyHealthMod: 1.5, // Enemies have more health
                enemySpeedMod: 1.2,  // Enemies move faster
                enemyDamageMod: 1.5, // Enemies deal more damage
                enemyAttackCooldownMod: 0.7, // Enemies attack faster
                initialLivesMod: 0.7 // Fewer initial lives
            };
            default: return { // Default to normal if somehow not set
                enemyLimit: 4, spawnRate: 2500, scoreMultiplier: 1.0,
                enemyHealthMod: 1.0, enemySpeedMod: 1.0, enemyDamageMod: 1.0,
                enemyAttackCooldownMod: 1.0, initialLivesMod: 1.0
            };
        }
    }, [difficulty]);

    const createParticles = useCallback((x, y, color, count = 8, sizeMin = 2, sizeMax = 4) => {
        const newParticles = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            newParticles.push({
                id: Date.now() + Math.random(),
                x: x + (Math.random() - 0.5) * 0.3,
                y: y + (Math.random() - 0.5) * 0.3,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                life: 1,
                decay: 0.03,
                size: Math.random() * (sizeMax - sizeMin) + sizeMin
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
    }, []);

    const generateEntityPosition = useCallback((excludePositions) => {
        const maxAttempts = 50;
        for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const x = Math.floor(Math.random() * GRID_SIZE);
            const y = Math.floor(Math.random() * GRID_SIZE);

            const isOccupied = excludePositions.some(pos => pos.x === x && pos.y === y);
            if (!isOccupied) {
                return { x, y };
            }
        }
        return null; // Should ideally not happen on an 8x8 grid with few entities
    }, []);

    // --- CORE GAME LOGIC ---
    const fireWeapon = useCallback((targetX, targetY) => {
        if (gameState !== 'playing') return;

        soundsRef.current?.shoot();
        const damageMultiplier = activePowerUpsRef.current.rage ? 2 : 1;
        const actualDamage = currentWeaponRef.current.damage * damageMultiplier;

        const newBullets = [];

        // Main bullet
        newBullets.push({
            id: Date.now() + Math.random(),
            x: playerPositionRef.current.x,
            y: playerPositionRef.current.y,
            targetX,
            targetY,
            damage: actualDamage,
            speed: currentWeaponRef.current.speed,
            type: currentWeaponRef.current.type
        });

        // Multishot power-up
        if (activePowerUpsRef.current.multishot) {
            const directions = [
                { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
                { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
                { dx: 1, dy: 1 }, { dx: -1, dy: -1 },
                { dx: 1, dy: -1 }, { dx: -1, dy: 1 }
            ]; // All 8 directions
            directions.forEach((dir, index) => {
                newBullets.push({
                    id: Date.now() + Math.random() + index + 0.1, // Ensure unique ID
                    x: playerPositionRef.current.x,
                    y: playerPositionRef.current.y,
                    targetX: playerPositionRef.current.x + dir.dx * GRID_SIZE, // Shoot to edge of grid
                    targetY: playerPositionRef.current.y + dir.dy * GRID_SIZE,
                    damage: actualDamage,
                    speed: currentWeaponRef.current.speed,
                    type: currentWeaponRef.current.type
                });
            });
        }

        setBullets(prev => [...prev, ...newBullets]);
    }, [gameState]); // Removed playerPosition, currentWeapon, activePowerUps from dependencies, using refs

    const startGame = useCallback(() => {
        setGameState('playing');
        setPlayerPosition({ x: 4, y: 4 });

        const randomMission = MISSION_TYPES[Math.floor(Math.random() * MISSION_TYPES.length)];
        setCurrentMission(randomMission);
        setMissionProgress(0);

        const diffSettings = getDifficultySettings();

        // Create initial enemies (reduced initial count for better starting experience)
        const initialEnemies = [];
        const occupiedPositions = [{ x: 4, y: 4 }]; // Player position
        for (let i = 0; i < Math.min(diffSettings.enemyLimit, 2); i++) { // Start with max 2 enemies
            const enemyType = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
            const position = generateEntityPosition(occupiedPositions);
            if (position) {
                initialEnemies.push({
                    ...position,
                    ...enemyType,
                    id: `enemy-${Date.now()}-${i}`,
                    health: Math.ceil(enemyType.health * diffSettings.enemyHealthMod),
                    maxHealth: Math.ceil(enemyType.health * diffSettings.enemyHealthMod),
                    damage: Math.ceil(enemyType.damage * diffSettings.enemyDamageMod),
                    speed: enemyType.speed * diffSettings.enemySpeedMod,
                    attackCooldown: enemyType.attackCooldown * diffSettings.enemyAttackCooldownMod,
                    lastAttack: 0,
                    attacking: false // New state for attack animation/indicator
                });
                occupiedPositions.push(position);
            }
        }
        setEnemies(initialEnemies);

        // Reset all other states
        setPowerUps([]);
        setWeaponPickups([]);
        setBullets([]);
        setParticles([]);
        setScore(0);
        setCombo(0);
        setMaxCombo(0);
        setTimeLeft(GAME_DURATION);
        setLives(Math.floor(INITIAL_LIVES * diffSettings.initialLivesMod)); // Apply initial lives mod
        setLevel(1);
        setCurrentTheme(LEVEL_THEMES[0]); // Always start with first theme, can be dynamic later
        setCurrentWeapon(BASE_PISTOL);
        setCurrentWeaponEndTime(0);
        setActivePowerUps({});
        setEnemiesKilled(0);
        setEnemyAttackIndicators([]);
    }, [generateEntityPosition, getDifficultySettings]);

    const handleCellClick = useCallback((x, y) => { // Removed event param as it's not used
        if (gameState !== 'playing') return;

        // Check for enemy at clicked position
        const enemy = enemiesRef.current.find(e => e.x === x && e.y === y);
        if (enemy) {
            fireWeapon(x, y);
            return;
        }

        // Check for weapon pickup
        const weaponPickup = weaponPickupsRef.current.find(w => w.x === x && w.y === y);
        if (weaponPickup) {
            soundsRef.current?.weaponPickup();
            const pickedUpWeaponType = WEAPON_TYPES.find(w => w.type === weaponPickup.weaponType);

            if (pickedUpWeaponType && pickedUpWeaponType.type !== BASE_PISTOL.type) {
                setCurrentWeapon(pickedUpWeaponType);
                const duration = pickedUpWeaponType.duration || (Math.floor(Math.random() * (20 - 5 + 1) + 5) * 1000); // Use weapon's defined duration or random
                setCurrentWeaponEndTime(Date.now() + duration);
            }
            setWeaponPickups(prev => prev.filter(w => w.id !== weaponPickup.id));
            createParticles(x, y, pickedUpWeaponType?.color || '#fbbf24', 8);
            return;
        }

        // Check for power-up
        const powerUp = powerUpsRef.current.find(p => p.x === x && p.y === y);
        if (powerUp) {
            soundsRef.current?.powerup();
            if (powerUp.category === 'super') {
                if (powerUp.type === 'bomb') {
                    // Bomb affects adjacent enemies
                    setEnemies(prevEnemies => {
                        const affectedEnemies = prevEnemies.filter(e => Math.abs(e.x - x) <= 1 && Math.abs(e.y - y) <= 1);
                        affectedEnemies.forEach(e => createParticles(e.x, e.y, '#f97316', 15, 3, 6)); // Explosion particles for each affected enemy
                        if (affectedEnemies.length > 0) soundsRef.current?.explosion();
                        return prevEnemies.filter(e => !(Math.abs(e.x - x) <= 1 && Math.abs(e.y - y) <= 1)); // Remove affected enemies
                    });
                    if (currentMission.type === 'elimination') setMissionProgress(prev => prev + powerUp.target || 3); // Bomb eliminates a few enemies
                } else if (powerUp.type === 'nuke') {
                    setEnemies([]); // Clear all enemies
                    soundsRef.current?.explosion();
                    // Particles from center of explosion
                    createParticles(x, y, '#fbbf24', 30, 4, 8);
                    if (currentMission.type === 'elimination') setMissionProgress(prev => prev + powerUp.target || 10); // Nuke eliminates many enemies
                } else if (powerUp.type === 'heal') {
                    setLives(prev => Math.min(INITIAL_LIVES * getDifficultySettings().initialLivesMod, prev + 2)); // Max lives depends on difficulty
                }
            } else {
                setActivePowerUps(prev => ({ ...prev, [powerUp.type]: Date.now() + powerUp.duration }));
            }
            setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
            createParticles(x, y, powerUp.color, 8);
            if (currentMission.type === 'collection') setMissionProgress(prev => prev + 1);
            return;
        }

        // Move player if cell is empty AND is adjacent to current player position (new rule for tactical movement)
        const dx = Math.abs(x - playerPositionRef.current.x);
        const dy = Math.abs(y - playerPositionRef.current.y);

        if ((dx <= 1 && dy <= 1 && (dx > 0 || dy > 0)) && // Must be adjacent and actually moving
            !enemiesRef.current.some(e => e.x === x && e.y === y) &&
            !powerUpsRef.current.some(p => p.x === x && p.y === y) &&
            !weaponPickupsRef.current.some(w => w.x === x && w.y === y)) {
            setPlayerPosition({ x, y });
        }
    }, [gameState, createParticles, getDifficultySettings]); // Using refs, so dependencies simplified


    // --- GAME LOOP EFFECTS ---

    useInterval(() => { // Enemy Movement
        if (gameStateRef.current !== 'playing' || activePowerUpsRef.current.freeze) return;

        setEnemies(prevEnemies => prevEnemies.map(enemy => {
            // enemy.speed already contains the difficulty modification from startGame
            if (Math.random() < enemy.speed) { // Probability-based movement
                let newX = enemy.x;
                let newY = enemy.y;

                const dx = playerPositionRef.current.x - enemy.x;
                const dy = playerPositionRef.current.y - enemy.y;

                // Simple movement towards player, avoids moving onto other enemies/objects
                const possibleMoves = [];
                if (dx > 0) possibleMoves.push({ x: enemy.x + 1, y: enemy.y });
                if (dx < 0) possibleMoves.push({ x: enemy.x - 1, y: enemy.y });
                if (dy > 0) possibleMoves.push({ x: enemy.x, y: enemy.y + 1 });
                if (dy < 0) possibleMoves.push({ x: enemy.x, y: enemy.y - 1 });

                // Add diagonal moves for more dynamic movement
                if (dx > 0 && dy > 0) possibleMoves.push({ x: enemy.x + 1, y: enemy.y + 1 });
                if (dx < 0 && dy < 0) possibleMoves.push({ x: enemy.x - 1, y: enemy.y - 1 });
                if (dx > 0 && dy < 0) possibleMoves.push({ x: enemy.x + 1, y: enemy.y - 1 });
                if (dx < 0 && dy > 0) possibleMoves.push({ x: enemy.x - 1, y: enemy.y + 1 });


                // Filter valid moves (within grid, not occupied by other enemies/player)
                const validMoves = possibleMoves.filter(move =>
                    move.x >= 0 && move.x < GRID_SIZE &&
                    move.y >= 0 && move.y < GRID_SIZE &&
                    !(move.x === playerPositionRef.current.x && move.y === playerPositionRef.current.y) &&
                    !prevEnemies.some(e => e.id !== enemy.id && e.x === move.x && e.y === move.y) // Don't move into other enemies
                );

                if (validMoves.length > 0) {
                    // Prioritize moves that reduce distance to player
                    validMoves.sort((a, b) => {
                        const distA = Math.hypot(a.x - playerPositionRef.current.x, a.y - playerPositionRef.current.y);
                        const distB = Math.hypot(b.x - playerPositionRef.current.x, b.y - playerPositionRef.current.y);
                        return distA - distB;
                    });
                    newX = validMoves[0].x;
                    newY = validMoves[0].y;
                }

                return { ...enemy, x: newX, y: newY };
            }
            return enemy;
        }));
    }, gameState === 'playing' ? 800 : null); // Enemy movement checks

    useInterval(() => { // Enemy Spawning
        if (gameStateRef.current !== 'playing') return;
        const diffSettings = getDifficultySettings(); // Re-fetch current settings

        setEnemies(prevEnemies => {
            if (prevEnemies.length >= diffSettings.enemyLimit) return prevEnemies;

            const occupiedPositions = [...prevEnemies, ...powerUpsRef.current, ...weaponPickupsRef.current, playerPositionRef.current];
            const position = generateEntityPosition(occupiedPositions);

            if (position) {
                const enemyType = ENEMY_TYPES[Math.floor(Math.random() * ENEMY_TYPES.length)];
                const newEnemy = {
                    ...position,
                    ...enemyType,
                    id: `enemy-${Date.now()}-${Math.random()}`,
                    health: Math.ceil(enemyType.health * diffSettings.enemyHealthMod),
                    maxHealth: Math.ceil(enemyType.health * diffSettings.enemyHealthMod),
                    damage: Math.ceil(enemyType.damage * diffSettings.enemyDamageMod),
                    speed: enemyType.speed * diffSettings.enemySpeedMod,
                    attackCooldown: enemyType.attackCooldown * diffSettings.enemyAttackCooldownMod,
                    lastAttack: 0,
                    attacking: false // Initialize attack state
                };
                return [...prevEnemies, newEnemy];
            }
            return prevEnemies;
        });
    }, gameState === 'playing' ? getDifficultySettings().spawnRate : null); // Use dynamic spawnRate

    useInterval(() => { // Weapon Pickup Spawning
        if (gameStateRef.current !== 'playing') return;

        setWeaponPickups(prevWeapons => {
            if (prevWeapons.length >= 2) return prevWeapons; // Limit to 2 weapons on map

            const occupiedPositions = [...enemiesRef.current, ...powerUpsRef.current, ...prevWeapons, playerPositionRef.current];
            const position = generateEntityPosition(occupiedPositions);

            if (position) {
                const availableWeapons = WEAPON_TYPES.filter(w => w.type !== BASE_PISTOL.type);
                if (availableWeapons.length === 0) return prevWeapons; // No weapons to spawn

                const weaponType = availableWeapons[Math.floor(Math.random() * availableWeapons.length)];
                return [...prevWeapons, {
                    ...position,
                    id: `weapon-${Date.now()}`,
                    weaponType: weaponType.type,
                    emoji: weaponType.emoji,
                    color: weaponType.color,
                    rarity: weaponType.rarity
                }];
            }
            return prevWeapons;
        });
    }, gameState === 'playing' ? 6000 : null);

    useInterval(() => { // Power-up Spawning
        if (gameStateRef.current !== 'playing') return;

        setPowerUps(prevPowerUps => {
            if (prevPowerUps.length >= 3) return prevPowerUps; // Limit to 3 power-ups on map

            const occupiedPositions = [...enemiesRef.current, ...weaponPickupsRef.current, ...prevPowerUps, playerPositionRef.current];
            const position = generateEntityPosition(occupiedPositions);

            if (position) {
                const isSuper = Math.random() < 0.2; // 20% chance for super power-up
                const powerUpArray = isSuper ? SUPER_WEAPONS : POWERUP_TYPES;
                if (powerUpArray.length === 0) return prevPowerUps; // No power-ups to spawn

                const powerUpType = powerUpArray[Math.floor(Math.random() * powerUpArray.length)];

                return [...prevPowerUps, {
                    ...position,
                    ...powerUpType,
                    id: `powerup-${Date.now()}`
                }];
            }
            return prevPowerUps;
        });
    }, gameState === 'playing' ? 8000 : null);

    useInterval(() => { // Enemy Attacks (All enemies now "melee" for player damage)
        if (gameStateRef.current !== 'playing' || activePowerUpsRef.current.shield) return;

        const now = Date.now();
        const newAttackIndicators = []; // To store temporary attack indicators

        setEnemies(prevEnemies => prevEnemies.map(enemy => {
            const distance = Math.max(Math.abs(enemy.x - playerPositionRef.current.x), Math.abs(enemy.y - playerPositionRef.current.y));
            const withinRange = distance <= enemy.damageRadius;

            // If enemy is ready to attack and within range
            if (withinRange && (now - enemy.lastAttack) >= enemy.attackCooldown) {
                // Set enemy to 'attacking' state for a brief period to show windup
                soundsRef.current?.enemyAttackWindup(); // Play a sound cue for attack windup
                newAttackIndicators.push({
                    id: enemy.id,
                    x: enemy.x,
                    y: enemy.y,
                    radius: enemy.damageRadius,
                    color: enemy.attackIndicatorColor,
                    endTime: now + 500 // Indicator shows for 500ms before damage
                });

                // Schedule the actual damage after a short delay to match indicator
                setTimeout(() => {
                    // Re-check conditions as state might have changed
                    if (gameStateRef.current === 'playing' && !activePowerUpsRef.current.shield && livesRef.current > 0) {
                        const currentDistance = Math.max(Math.abs(enemy.x - playerPositionRef.current.x), Math.abs(enemy.y - playerPositionRef.current.y));
                        if (currentDistance <= enemy.damageRadius) { // Player must still be in range
                            soundsRef.current?.damage();
                            setIsDamaged(true); // Trigger screen shake
                            setTimeout(() => setIsDamaged(false), 300); // Stop screen shake

                            setLives(prevLives => {
                                const newLives = Math.max(0, prevLives - enemy.damage);
                                if (newLives <= 0) {
                                    setGameState('lost'); // Game over
                                    soundsRef.current?.gameOver();
                                }
                                return newLives;
                            });
                            setCombo(0); // Reset combo on hit
                            createParticles(playerPositionRef.current.x, playerPositionRef.current.y, '#ef4444', 10); // Damage particles
                        }
                    }
                }, 500); // Damage applies after 500ms

                return { ...enemy, lastAttack: now, attacking: true }; // Mark as attacking
            }
            // If not attacking, ensure 'attacking' state is false
            return { ...enemy, attacking: false };
        }));
        // Update attack indicators
        setEnemyAttackIndicators(prev => [...prev.filter(ind => ind.endTime > now), ...newAttackIndicators]);
    }, gameState === 'playing' ? 250 : null); // Check for attacks more frequently to allow for windup animation

    useInterval(() => { // Player Bullet Movement and Collision
        if (gameStateRef.current !== 'playing') return;

        setBullets(prevBullets => {
            const newBullets = [];
            const enemiesHitThisTick = new Set(); // To ensure one enemy is hit once per bullet tick

            prevBullets.forEach(bullet => {
                let currentX = bullet.x;
                let currentY = bullet.y;

                const dx = bullet.targetX - currentX;
                const dy = bullet.targetY - currentY;

                const distance = Math.hypot(dx, dy);
                const stepSize = (bullet.speed / 1000) * 0.5; // Scale step size by bullet speed

                if (distance > stepSize) {
                    currentX += (dx / distance) * stepSize;
                    currentY += (dy / distance) * stepSize;
                } else {
                    currentX = bullet.targetX;
                    currentY = bullet.targetY;
                }

                // Bullet collision check
                const hitEnemy = enemiesRef.current.find(enemy =>
                    enemy.health > 0 &&
                    !enemiesHitThisTick.has(enemy.id) && // Only hit if not already hit by another bullet this tick
                    Math.round(currentX) === enemy.x && Math.round(currentY) === enemy.y
                );

                if (hitEnemy) {
                    soundsRef.current?.hit();
                    enemiesHitThisTick.add(hitEnemy.id); // Mark enemy as hit

                    const now = Date.now();
                    setLastHitTime(now); // Update last hit time for combo
                    setCombo(prevCombo => {
                        const newCombo = (now - lastHitTime < 3000) ? prevCombo + 1 : 1;
                        setMaxCombo(max => Math.max(max, newCombo));
                        return newCombo;
                    });

                    setEnemies(prevEnemies => prevEnemies.map(enemy => {
                        if (enemy.id === hitEnemy.id) {
                            const newHealth = enemy.health - bullet.damage;
                            if (newHealth <= 0) {
                                setScore(prev => prev + Math.floor(enemy.score * getDifficultySettings().scoreMultiplier));
                                setEnemiesKilled(prev => prev + 1);
                                if (currentMission.type === 'elimination') setMissionProgress(prev => prev + 1);
                                createParticles(enemy.x, enemy.y, currentTheme.bulletColor, 10);
                                return null; // Remove enemy
                            }
                            return { ...enemy, health: newHealth };
                        }
                        return enemy;
                    }).filter(Boolean)); // Filter out null (defeated enemies)

                    // Sniper and Explosive bullets pass through or explode
                    if (bullet.type === 'sniper' || bullet.type === 'rocket' || bullet.type === 'laser') {
                        // For piercing/explosive, continue moving the bullet but deal damage
                        if (bullet.type === 'rocket') {
                            // Rocket: small explosion radius
                            setEnemies(prevEnemies => {
                                const affectedEnemies = prevEnemies.filter(e => Math.abs(e.x - Math.round(currentX)) <= 1 && Math.abs(e.y - Math.round(currentY)) <= 1 && e.id !== hitEnemy.id);
                                affectedEnemies.forEach(e => {
                                    const newHealth = e.health - bullet.damage;
                                    if (newHealth <= 0) {
                                        setScore(prev => prev + Math.floor(e.score * getDifficultySettings().scoreMultiplier));
                                        setEnemiesKilled(prev => prev + 1);
                                        if (currentMission.type === 'elimination') setMissionProgress(prev => prev + 1);
                                        createParticles(e.x, e.y, '#f97316', 12);
                                        return null;
                                    }
                                    return { ...e, health: newHealth };
                                });
                                createParticles(Math.round(currentX), Math.round(currentY), '#f97316', 20, 3, 7); // Explosion particles
                                soundsRef.current?.explosion();
                                return prevEnemies.map(e => {
                                    if (affectedEnemies.some(ae => ae.id === e.id)) {
                                        const updated = affectedEnemies.find(ae => ae.id === e.id);
                                        return updated === null ? null : updated; // Apply health changes or null
                                    }
                                    return e;
                                }).filter(Boolean);
                            });
                        }
                        newBullets.push({ ...bullet, x: currentX, y: currentY }); // Continue bullet path
                    } else {
                        // Standard bullets disappear on hit
                        return;
                    }
                }

                // If bullet goes out of bounds
                if (currentX < 0 || currentX >= GRID_SIZE || currentY < 0 || currentY >= GRID_SIZE) {
                    return; // Bullet disappears
                }

                newBullets.push({ ...bullet, x: currentX, y: currentY });
            });

            return newBullets;
        });
    }, gameState === 'playing' ? 25 : null); // Faster bullet update for smoother movement and more precise hits

    useInterval(() => { // Game Timer
        if (gameStateRef.current !== 'playing') return;

        setTimeLeft(prev => {
            if (prev <= 1) {
                setGameState('won');
                const finalScore = Math.floor(score * 1.5); // Bonus for winning
                setScore(finalScore);
                setHighScore(prevHigh => {
                    const newHigh = Math.max(prevHigh, finalScore);
                    localStorage.setItem('ultimateHighScore', newHigh.toString());
                    return newHigh;
                });
                soundsRef.current?.levelUp(); // Play a win sound
                return 0;
            }
            // Mission progress for survival is based on time left
            if (currentMission.type === 'survival') setMissionProgress(prev => prev + 1); // Increment for each second survived
            return prev - 1;
        });
    }, gameState === 'playing' ? 1000 : null);

    useInterval(() => { // Particle Animation
        if (gameStateRef.current !== 'playing') return;

        setParticles(prev => prev.map(p => ({
            ...p,
            x: p.x + p.vx * 0.1,
            y: p.y + p.vy * 0.1,
            life: p.life - p.decay
        })).filter(p => p.life > 0));
    }, gameState === 'playing' ? 50 : null);

    // Power-up and Weapon Expiration useEffect
    useEffect(() => {
        const now = Date.now();
        const timers = Object.entries(activePowerUps).map(([type, endTime]) => {
            const timeLeft = endTime - now;
            if (timeLeft > 0) {
                return setTimeout(() => {
                    setActivePowerUps(prev => {
                        const newPowerUps = { ...prev };
                        delete newPowerUps[type];
                        return newPowerUps;
                    });
                }, timeLeft);
            }
            return null;
        }).filter(Boolean);

        // Handle temporary weapon expiry
        if (currentWeapon.type !== BASE_PISTOL.type && currentWeaponEndTime > 0 && now >= currentWeaponEndTime) {
            setCurrentWeapon(BASE_PISTOL);
            setCurrentWeaponEndTime(0);
        }

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [activePowerUps, currentWeapon, currentWeaponEndTime]);

    // --- RENDERING ---
    const renderCell = useCallback((x, y) => {
        const isPlayer = playerPosition.x === x && playerPosition.y === y;
        const enemy = enemies.find(e => e.x === x && e.y === y);
        const powerUp = powerUps.find(p => p.x === x && p.y === y);
        const weaponPickup = weaponPickups.find(w => w.x === x && w.y === y);
        const bullet = bullets.find(b => Math.round(b.x) === x && Math.round(b.y) === y);
        const cellParticles = particles.filter(p => Math.round(p.x) === x && Math.round(p.y) === y);
        const attackIndicator = enemyAttackIndicators.find(ind =>
            Math.abs(x - ind.x) <= ind.radius && Math.abs(y - ind.y) <= ind.radius
        );

        const baseStyle = {
            width: '90%', height: '90%', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 'clamp(14px, 3vw, 22px)',
            position: 'relative', zIndex: 2, fontWeight: 'bold'
        };

        if (isPlayer) {
            let playerEmoji = '🕵️';
            if (activePowerUps.shield) playerEmoji = '🛡️';
            if (activePowerUps.rage) playerEmoji = '😡';

            return (
                <div style={{
                    ...baseStyle,
                    backgroundColor: activePowerUps.shield ? '#8b5cf6' : activePowerUps.rage ? '#dc2626' : currentTheme.playerColor,
                    animation: 'pulse 2s infinite',
                    boxShadow: activePowerUps.shield ? '0 0 20px #8b5cf6' : 'none'
                }}>
                    <span role="img" aria-label="player">{playerEmoji}</span>
                </div>
            );
        }
        if (enemy) {
            const healthPercent = enemy.health / enemy.maxHealth;
            return (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <div style={{
                        ...baseStyle,
                        backgroundColor: activePowerUps.freeze ? '#06b6d4' : enemy.color,
                        cursor: 'pointer',
                        fontSize: 'clamp(16px, 3.5vw, 24px)'
                    }}>
                        <span role="img" aria-label="enemy">{enemy.emoji}</span>
                    </div>
                    {healthPercent < 1 && (
                        <div style={{
                            position: 'absolute', bottom: '-8px', left: '5%',
                            width: '90%', height: '6px',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            borderRadius: '3px', border: '1px solid white', zIndex: 3
                        }}>
                            <div style={{
                                width: `${healthPercent * 100}%`, height: '100%',
                                backgroundColor: healthPercent > 0.6 ? '#10b981' : healthPercent > 0.3 ? '#f59e0b' : '#ef4444',
                                borderRadius: '2px', transition: 'width 0.3s ease'
                            }} />
                        </div>
                    )}
                </div>
            );
        }

        if (weaponPickup) {
            return (
                <div style={{
                    ...baseStyle,
                    backgroundColor: weaponPickup.color,
                    cursor: 'pointer',
                    border: '2px solid white',
                    borderRadius: '15%',
                    fontSize: 'clamp(20px, 4.5vw, 28px)',
                    animation: 'pulse 2s infinite'
                }}>
                    <span role="img" aria-label="weapon">{weaponPickup.emoji}</span>
                </div>
            );
        }

        if (powerUp) {
            const isSuper = powerUp.category === 'super';
            return (
                <div style={{
                    ...baseStyle,
                    backgroundColor: powerUp.color,
                    cursor: 'pointer',
                    border: isSuper ? '3px solid gold' : '2px solid white',
                    borderRadius: '20%',
                    fontSize: 'clamp(18px, 4vw, 26px)',
                    animation: 'pulse 1.5s infinite'
                }}>
                    <span role="img" aria-label="powerup">{powerUp.emoji}</span>
                </div>
            );
        }

        if (bullet) {
            return (
                <div style={{
                    width: '60%', height: '60%',
                    backgroundColor: currentTheme.bulletColor,
                    borderRadius: '50%',
                    zIndex: 1,
                    // Add a pulse animation for bullets for better visibility
                    animation: 'pulse-bullet 0.5s infinite alternate'
                }} />
            );
        }

        if (cellParticles.length > 0) {
            return (
                <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {cellParticles.map(p => (
                        <div key={p.id} style={{
                            position: 'absolute',
                            left: `${((p.x % 1) * 100).toFixed(2)}%`,
                            top: `${((p.y % 1) * 100).toFixed(2)}%`,
                            width: `${p.size}px`, height: `${p.size}px`,
                            backgroundColor: p.color,
                            borderRadius: '50%',
                            opacity: p.life,
                            zIndex: 3
                        }} />
                    ))}
                </div>
            );
        }
        // Render enemy attack indicator background if present
        if (attackIndicator) {
            return (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: attackIndicator.color,
                    zIndex: 0, // Ensure it's behind entities
                    animation: 'fade-in-out 0.5s forwards' // Visual cue for attack
                }} />
            );
        }


        return null;
    }, [playerPosition, enemies, powerUps, weaponPickups, bullets, particles, activePowerUps, currentTheme, enemyAttackIndicators]);

    return (
        <div
            className={`game-container ${isDamaged ? 'screen-shake' : ''}`}
            style={{
                minHeight: '100vh',
                background: currentTheme.background,
                color: 'white',
                fontFamily: 'Arial, sans-serif',
                padding: '10px',
                userSelect: 'none',
                touchAction: 'none' // CSS fix for touch events instead of preventDefault
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h1 style={{ margin: 0, fontSize: 'clamp(18px, 4vw, 24px)' }}>🎯 Ultimate Tactical Agent</h1>
                    <div style={{ fontSize: 'clamp(12px, 2.5vw, 16px)' }}>Level {level} - {currentTheme.name}</div>
                </div>
                {gameState === 'playing' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: 'clamp(12px, 2.5vw, 16px)' }}>
                        <div>⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                        <div>❤️ {lives}</div>
                        <div>🎯 {score}</div>
                        <div>🔥 {combo}x</div>
                    </div>
                )}
            </div>
            {/* Current Weapon Display */}
            {gameState === 'playing' && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', marginRight: '10px' }}>Current Weapon:</div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '5px 10px',
                        backgroundColor: currentWeapon.color,
                        border: `2px solid ${currentWeapon.color}`,
                        borderRadius: '15px',
                        fontSize: 'clamp(10px, 2vw, 12px)',
                        boxShadow: `0 0 10px ${currentWeapon.color}`
                    }}>
                        <span style={{ fontSize: 'clamp(14px, 3vw, 18px)' }} role="img" aria-label="weapon">{currentWeapon.emoji}</span>
                        <span>{currentWeapon.description}</span>
                        {currentWeapon.type !== BASE_PISTOL.type && currentWeaponEndTime > Date.now() && (
                            <span style={{ marginLeft: '5px', color: 'rgba(255,255,255,0.7)' }}>
                                ({Math.ceil((currentWeaponEndTime - Date.now()) / 1000)}s)
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Game Grid */}
            {gameState === 'playing' && (
                <>
                    <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', textAlign: 'center', marginBottom: '10px' }}>
                        Mission: {currentMission.description} ({missionProgress}/{currentMission.target})
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gap: '2px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        aspectRatio: '1',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        padding: '10px',
                        borderRadius: '15px',
                        border: `3px solid ${currentTheme.cellBorder}`
                    }}>
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
                            const x = index % GRID_SIZE;
                            const y = Math.floor(index / GRID_SIZE);
                            const isAdjacent = Math.abs(x - playerPosition.x) <= 1 && Math.abs(y - playerPosition.y) <= 1;
                            // const hasEnemyThreat = enemies.some(e =>
                            //     Math.abs(e.x - x) <= e.damageRadius && Math.abs(e.y - y) <= e.damageRadius && e.attacking
                            // );
                            const isEnemyThreatTarget = enemyAttackIndicators.some(ind =>
                                Math.abs(x - ind.x) <= ind.radius && Math.abs(y - ind.y) <= ind.radius
                            );

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleCellClick(x, y)}
                                    onTouchStart={() => handleCellClick(x, y)}
                                    style={{
                                        backgroundColor: isEnemyThreatTarget ? currentTheme.threatColor : (isAdjacent ? currentTheme.adjacentColor : currentTheme.cellColor),
                                        border: `1px solid ${currentTheme.cellBorder}`,
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.1s ease', // Faster transition for responsiveness
                                        position: 'relative',
                                        minHeight: '40px',
                                        boxShadow: isEnemyThreatTarget ? `0 0 10px ${currentTheme.threatColor}` : 'none'
                                    }}
                                >
                                    {renderCell(x, y)}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            {/* Active Power-ups */}
            {gameState === 'playing' && Object.keys(activePowerUps).length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', marginRight: '10px' }}>Active:</div>
                    {Object.entries(activePowerUps).map(([type, endTime]) => {
                        const powerUp = [...POWERUP_TYPES, ...SUPER_WEAPONS].find(p => p.type === type);
                        if (!powerUp || endTime <= Date.now()) return null;
                        const timeLeft = Math.ceil((endTime - Date.now()) / 1000);
                        return (
                            <div key={type} style={{
                                display: 'flex', alignItems: 'center', gap: '5px',
                                padding: '5px 10px',
                                backgroundColor: powerUp.color,
                                border: '2px solid white',
                                borderRadius: '15px',
                                fontSize: 'clamp(10px, 2vw, 12px)'
                            }}>
                                <span style={{ fontSize: 'clamp(14px, 3vw, 18px)' }} role="img" aria-label="powerup">{powerUp.emoji}</span>
                                <span>{timeLeft}s</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Ready Screen */}
            {gameState === 'ready' && (
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
                    <h2 style={{ fontSize: 'clamp(20px, 5vw, 32px)', marginBottom: '20px' }}>🎯 Ultimate Tactical Agent Game</h2>
                    <div style={{ marginBottom: '20px', fontSize: 'clamp(14px, 3vw, 18px)' }}>
                        <p><strong>🎮 How to Play:</strong></p>
                        <p>• Click/tap enemies to **shoot** them.</p>
                        <p>• Click/tap **power-ups** and **weapons** to collect them.</p>
                        <p>• Click/tap **adjacent empty spaces** to move. You can only move one square at a time.</p>
                        <p>• Enemies attack when you are within their **threat range**. Look for the **red glow**!</p>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: 'clamp(14px, 3vw, 18px)', marginRight: '10px' }}>Difficulty:</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                fontSize: 'clamp(12px, 2.5vw, 16px)',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: 'black',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '8px'
                            }}
                        >
                            <option value="easy">Easy</option>
                            <option value="normal">Normal</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <button
                        onClick={startGame}
                        style={{
                            padding: '15px 30px',
                            fontSize: 'clamp(16px, 4vw, 20px)',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                        }}
                    >
                        🚀 Start Mission
                    </button>
                    <div style={{ marginTop: '20px', fontSize: 'clamp(12px, 2.5vw, 16px)' }}>
                        High Score: {highScore.toLocaleString()}
                    </div>
                </div>
            )}

            {/* Game Over Screen */}
            {(gameState === 'won' || gameState === 'lost') && (
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
                    <h2 style={{
                        fontSize: 'clamp(24px, 6vw, 36px)',
                        marginBottom: '20px',
                        color: gameState === 'won' ? '#10b981' : '#ef4444'
                    }}>
                        {gameState === 'won' ? '🎉 Mission Complete!' : '💀 Mission Failed'}
                    </h2>
                    <div style={{
                        fontSize: 'clamp(16px, 4vw, 20px)',
                        marginBottom: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px'
                    }}>
                        <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                            <div>🎯 Final Score</div>
                            <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#fbbf24' }}>
                                {score.toLocaleString()}
                            </div>
                        </div>
                        <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                            <div>💀 Enemies Defeated</div>
                            <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#ef4444' }}>
                                {enemiesKilled}
                            </div>
                        </div>
                        <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                            <div>🔥 Max Combo</div>
                            <div style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold', color: '#f97316' }}>
                                {maxCombo}x
                            </div>
                        </div>
                    </div>
                    {score > highScore && (
                        <div style={{ fontSize: 'clamp(18px, 4vw, 24px)', color: '#fbbf24', marginBottom: '20px' }}>
                            🏆 NEW HIGH SCORE! 🏆
                        </div>
                    )}
                    <button
                        onClick={() => setGameState('ready')}
                        style={{
                            padding: '15px 30px',
                            fontSize: 'clamp(16px, 4vw, 20px)',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                        }}
                    >
                        🔄 Play Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default UltimateTacticalAgentGame;
