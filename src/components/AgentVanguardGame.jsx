// src/components/AgentVanguardGame.jsx
// Agent Vanguard: Glitch Dash - Health system updated to 10 max health
// Optimizations for reduced lag: particle system and drawing efficiency
// FIX: Agent starting position (now truly starts in the middle, boost applies after game starts)
// NEW: Implemented responsive scaling for mobile view
// FIX: Audio playback for mobile (unlocking audio context) - THIS IS THE APPLIED FIX
// NEW: Improved mobile screen utilization, fullscreen button, and **canvas centering**
// NEW: Enhanced dimension calculation for better landscape/portrait handling and larger desktop view
// NEW: Mobile portrait mode instruction to rotate device
// FIX: Bottom edge clipping in mobile landscape mode

import React, { useRef, useEffect, useState, useCallback } from 'react';

// --- Game Configuration Constants ---
const REFERENCE_GAME_WIDTH = 800; // Define the game's design width (used for internal scaling)
const GAME_ASPECT_RATIO = 16 / 9;
const REFERENCE_GAME_HEIGHT = REFERENCE_GAME_WIDTH / GAME_ASPECT_RATIO; // Calculate design height (approx 450)

// Maximum canvas size for non-fullscreen desktop view to prevent it from becoming absurdly large
const MAX_DESKTOP_CANVAS_WIDTH = 1200;

const AGENT_SIZE = 40; // Agent size (width of the chevron base)
const AGENT_X_POS = 100; // Fixed X position for agent

const GRAVITY = 0.1;
const JUMP_FORCE = -5;
const INITIAL_UPWARD_BOOST = -10;
const INITIAL_BOOST_DURATION = 40;

const BASE_GAME_SPEED = 2;
const MAX_GAME_SPEED = 6;
const SPEED_INCREASE_INTERVAL = 150;
const SPEED_INCREASE_AMOUNT = 0.1;

const OBSTACLE_WIDTH = 80;
const BASE_OBSTACLE_GAP_HEIGHT = 220;
const MIN_OBSTACLE_GAP_HEIGHT = 120;
const GAP_DECREASE_INTERVAL = 200;
const GAP_DECREASE_AMOUNT = 5;

const OBSTACLE_MIN_HEIGHT = 50;
const OBSTACLE_SPAWN_INTERVAL_BASE = 150;
const OBSTACLE_SPAWN_INTERVAL_MIN = 120;

const BALLOON_SPAWN_INTERVAL_BASE = 300;
const BALLOON_SPAWN_INTERVAL_MIN = 150;
const HEALTH_SPAWN_CHANCE = 0.20;
const SHIELD_SPAWN_CHANCE = 0.12;
const BUSTER_SPAWN_CHANCE = 0.08;

const BALLOON_SIZE = 30;
const BALLOON_VERTICAL_SPEED = 1;
const BALLOON_SPAWN_HORIZONTAL_OFFSET = 500;

const PICKUP_SIZE = 25;
const SHIELD_DURATION = 300;
const BUSTER_DURATION = 600;
const BUSTER_SHOT_SPEED = 15;

const DAMAGE_FLASH_DURATION = 15;

// --- Health Configuration ---
const INITIAL_HEALTH = 3;
const MAX_PLAYER_HEALTH = 10;

// --- Particle System Configuration (Optimized) ---
const MAX_PARTICLES = 100;
const PARTICLE_SPAWN_RATE = 2;
const PARTICLE_SIZE_RANGE = [3, 8];
const PARTICLE_ALPHA_DECAY = 0.04;
const PARTICLE_SHRINK_RATE = 0.95;

// --- Theming Colors (Keep as is) ---
const THEME_COLORS = {
    dark: {
        background: 'linear-gradient(to right, #2A0A4B, #4B1A7C)',
        containerBorder: '#9333ea',
        containerBoxShadow: 'rgba(147, 51, 234, 0.4)',
        heading: '#e9d5ff',
        scoreText: '#facc15',
        healthText: '#4ade80',
        canvasBorder: '#9333ea',
        canvasBoxShadow: 'rgba(147, 51, 234, 0.4)',
        instructionText: '#a1a1aa',
        gridLine: 'rgba(147, 51, 234, 0.15)',

        agentPrimary: '#FF4654',
        agentSecondary: '#FFD700',
        agentGlow: '#00D4FF',
        obstacle: '#00D4FF',
        obstacleGlow: '#FF4654',
        hostileBalloon: '#FF0000',
        hostileBalloonGlow: '#FFA500',
        healthPickup: '#00FF00',
        shieldPickup: '#00FFFF',
        busterPickup: '#FF00FF',
        shieldActiveGlow: 'rgba(0,255,255,0.7)',
        busterActiveGlow: 'rgba(255,0,255,0.7)',
        busterShot: '#FFFFFF',
        damageFlash: '#FFFFFF',
        trailParticle: 'rgba(0, 212, 255, 0.8)',
        thrustParticle: 'rgba(255, 200, 0, 0.9)',
        gameOverBg: 'rgba(0,0,0,0.7)',
        gameOverHeading: '#FF4654',
        gameOverScoreText: '#FFFFFF',
        tryAgainBtnBg: '#FF4654',
        tryAgainBtnBorder: '#00D4FF',
        fullscreenBtnBg: 'rgba(0,0,0,0.6)',
        fullscreenBtnText: '#FFF',
    },
    light: {
        background: 'linear-gradient(to right, #f3f4f6, #e5e7eb)',
        containerBorder: '#6d28d9',
        containerBoxShadow: 'rgba(109, 40, 217, 0.3)',
        heading: '#4c1d95',
        scoreText: '#ca8a04',
        healthText: '#16a34a',
        canvasBorder: '#6d28d9',
        canvasBoxShadow: 'rgba(109, 40, 217, 0.3)',
        instructionText: '#525252',
        gridLine: 'rgba(109, 40, 217, 0.1)',

        agentPrimary: '#DC2626',
        agentSecondary: '#FACC15',
        agentGlow: '#22D3EE',
        obstacle: '#22D3EE',
        obstacleGlow: '#DC2626',
        hostileBalloon: '#EF4444',
        hostileBalloonGlow: '#F97316',
        healthPickup: '#10B981',
        shieldPickup: '#06B6D4',
        busterPickup: '#EC4899',
        shieldActiveGlow: 'rgba(6,182,212,0.7)',
        busterActiveGlow: 'rgba(236,72,153,0.7)',
        busterShot: '#1F2937',
        damageFlash: '#DC2626',
        trailParticle: 'rgba(6, 182, 212, 0.8)',
        thrustParticle: 'rgba(251, 191, 36, 0.9)',
        gameOverBg: 'rgba(255,255,255,0.7)',
        gameOverHeading: '#DC2626',
        gameOverScoreText: '#1F2937',
        tryAgainBtnBg: '#DC2626',
        tryAgainBtnBorder: '#22D3EE',
        fullscreenBtnBg: 'rgba(255,255,255,0.6)',
        fullscreenBtnText: '#333',
    }
};

// --- Web Audio API Setup ---
// Use a single AudioContext instance for the whole application.
// This is created once when the module is loaded.
const audioContext = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

// Function to fetch and decode audio files into buffers
const loadAudioBuffer = async (url) => {
    if (!audioContext) return null;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
};


// --- Main Game Component ---
export default function AgentVanguardGame({ theme = 'dark' }) {
    const canvasRef = useRef(null);
    const gameContainerRef = useRef(null); // Ref for the main game container div
    const animationFrameId = useRef(null); // Reference to store RAF ID

    // --- Web Audio API Integration ---
    const audioBuffers = useRef({}); // To store decoded audio data
    const audioLoaded = useRef(false); // To track if audio has been loaded

    // New function with volume control
    const playSound = useCallback((bufferName, volume = 1.0) => {
        if (!audioContext || audioContext.state !== 'running' || !audioBuffers.current[bufferName]) {
            return;
        }
        // Create a Gain Node (volume control)
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffers.current[bufferName];

        // Connect the source to the Gain Node, and the Gain Node to the speakers
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        source.start(0);
    }, []);


    const unlockAndLoadAudio = useCallback(async () => {
        if (!audioContext || audioLoaded.current) return;
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
        try {
            console.log("Attempting to load audio assets...");
            const audioFiles = [
                { name: 'jump', path: '/audio/jump.wav' },
                { name: 'pickup', path: '/audio/pickup.wav' },
                { name: 'hit', path: '/audio/hit.wav' },
                { name: 'gameOver', path: '/audio/gameover.wav' },
                { name: 'busterActivate', path: '/audio/buster_activate.wav' },
                { name: 'busterShot', path: '/audio/buster_shot.wav' },
            ];
            const loadPromises = audioFiles.map(async (file) => {
                try {
                    audioBuffers.current[file.name] = await loadAudioBuffer(file.path);
                    console.log(`Successfully loaded ${file.name}.wav`);
                } catch (e) {
                    console.error(`Error loading ${file.name}.wav:`, e);
                    // Optionally, set a flag or use a fallback sound if a critical sound fails
                }
            });
            await Promise.all(loadPromises);
            audioLoaded.current = true;
            console.log("All audio loading attempts completed.");
            // Remove event listeners after successful unlock and loading
            document.removeEventListener('keydown', unlockAndLoadAudio);
            document.removeEventListener('mousedown', unlockAndLoadAudio);
            document.removeEventListener('touchstart', unlockAndLoadAudio);
        } catch (e) {
            console.error('Unexpected error during audio loading process:', e);
        }
    }, []);

    // Derive current colors based on theme prop
    const currentThemeColors = THEME_COLORS[theme];

    // Mutable game state managed directly by the game loop
    const gameState = useRef({
        agentY: 0,
        agentVelocity: 0,
        obstacles: [],
        projectiles: [],
        score: 0,
        frameCount: 0,
        isGameOver: false,
        isGameRunning: false,
        backgroundOffset: 0,
        trailParticles: [],
        initialBoostTimer: 0,
        currentSpeed: BASE_GAME_SPEED,
        currentGapHeight: BASE_OBSTACLE_GAP_HEIGHT,

        health: INITIAL_HEALTH,
        maxHealth: MAX_PLAYER_HEALTH,
        shieldActive: false,
        shieldTimer: 0,
        busterActive: false,
        busterTimer: 0,
        lastBalloonFrame: 0,
        damageFlashTimer: 0,
        damageText: null,
    });

    // React state for rendering UI elements (score, game over screen, health display)
    const [currentScore, setCurrentScore] = useState(0);
    const [isGameOverScreen, setIsGameOverScreen] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
    const [playerHealth, setPlayerHealth] = useState(INITIAL_HEALTH);
    const [isGameFullscreen, setIsGameFullscreen] = useState(false);
    const [isMobilePortrait, setIsMobilePortrait] = useState(false); // New state for mobile portrait detection

    // --- Canvas Sizing (Responsive) ---
    const updateCanvasDimensions = useCallback(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let newWidth;
        let newHeight;

        // Determine if we are on a mobile-like screen in portrait orientation
        const isCurrentlyMobilePortrait = windowWidth < 768 && windowWidth < windowHeight;
        setIsMobilePortrait(isCurrentlyMobilePortrait);

        // Calculate dimensions maintaining aspect ratio.
        // Adjust buffer percentages based on orientation to account for browser UI.
        const widthBuffer = 0.95; // More generous for width
        const heightBufferPortrait = 0.85; // Less generous for height in portrait (more browser UI space)
        const heightBufferLandscape = 0.8; // Even less generous for height in landscape (potential larger nav/address bars)

        const effectiveHeightBuffer = isCurrentlyMobilePortrait ? heightBufferPortrait : heightBufferLandscape;


        const targetWidthByHeight = windowHeight * effectiveHeightBuffer * GAME_ASPECT_RATIO;
        const targetHeightByWidth = windowWidth * widthBuffer / GAME_ASPECT_RATIO;

        if (targetWidthByHeight <= windowWidth * widthBuffer) {
            // Screen is wider relative to game aspect ratio (e.g., landscape desktop/mobile)
            // Fit based on height, ensuring it doesn't exceed screen width
            newHeight = windowHeight * effectiveHeightBuffer;
            newWidth = newHeight * GAME_ASPECT_RATIO;
        } else {
            // Screen is taller relative to game aspect ratio (e.g., portrait mobile)
            // Fit based on width
            newWidth = windowWidth * widthBuffer;
            newHeight = newWidth / GAME_ASPECT_RATIO;
        }

        // Apply a global maximum width for non-fullscreen mode
        if (!isGameFullscreen && newWidth > MAX_DESKTOP_CANVAS_WIDTH) {
            newWidth = MAX_DESKTOP_CANVAS_WIDTH;
            newHeight = newWidth / GAME_ASPECT_RATIO;
        }

        // Ensure newWidth and newHeight are at least a minimum sensible size
        const MIN_CANVAS_WIDTH = 320;
        const MIN_CANVAS_HEIGHT = MIN_CANVAS_WIDTH / GAME_ASPECT_RATIO;
        newWidth = Math.max(newWidth, MIN_CANVAS_WIDTH);
        newHeight = Math.max(newHeight, MIN_CANVAS_HEIGHT);

        setCanvasDimensions({ width: newWidth, height: newHeight });

        // Initialize agent Y position based on new canvas height
        gameState.current.agentY = newHeight / 2;
    }, [isGameFullscreen]); // Add isGameFullscreen to dependencies

    useEffect(() => {
        updateCanvasDimensions();
        window.addEventListener('resize', updateCanvasDimensions);

        // Listen for fullscreen change event
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!document.fullscreenElement;
            setIsGameFullscreen(isCurrentlyFullscreen);
            if (!isCurrentlyFullscreen) {
                setTimeout(updateCanvasDimensions, 50); // Small delay to ensure window dimensions are updated
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // For Safari
        document.addEventListener('mozfullscreenchange', handleFullscreenChange); // For Firefox
        document.addEventListener('MSFullscreenChange', handleFullscreenChange); // For IE/Edge

        return () => {
            window.removeEventListener('resize', updateCanvasDimensions);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, [updateCanvasDimensions]);

    // Add initial event listeners to unlock and load audio on any user interaction
    useEffect(() => {
        if (audioContext) {
            document.addEventListener('keydown', unlockAndLoadAudio, { once: true });
            document.addEventListener('mousedown', unlockAndLoadAudio, { once: true });
            document.addEventListener('touchstart', unlockAndLoadAudio, { once: true });

            return () => {
                document.removeEventListener('keydown', unlockAndLoadAudio);
                document.removeEventListener('mousedown', unlockAndLoadAudio);
                document.removeEventListener('touchstart', unlockAndLoadAudio);
            };
        }
    }, [unlockAndLoadAudio]); // Dependency on our useCallback function

    // Helper for random number
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // --- Game Loop (Physics and Logic) ---
    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Calculate scaling factor based on current canvas size and reference size
        const scaleX = canvas.width / REFERENCE_GAME_WIDTH;
        const scaleY = canvas.height / REFERENCE_GAME_HEIGHT;
        const effectiveScale = Math.min(scaleX, scaleY); // Use the smaller scale to maintain aspect ratio

        // Apply scaling to game constants that define sizes/positions
        const scaledAgentSize = AGENT_SIZE * effectiveScale;
        const scaledAgentXPos = AGENT_X_POS * effectiveScale;
        const scaledObstacleWidth = OBSTACLE_WIDTH * effectiveScale;
        const scaledBaseObstacleGapHeight = BASE_OBSTACLE_GAP_HEIGHT * effectiveScale;
        const scaledMinObstacleGapHeight = MIN_OBSTACLE_GAP_HEIGHT * effectiveScale;
        const scaledObstacleMinHeight = OBSTACLE_MIN_HEIGHT * effectiveScale;
        const scaledBalloonSize = BALLOON_SIZE * effectiveScale;
        const scaledPickupSize = PICKUP_SIZE * effectiveScale;

        // Scale speeds and forces
        const scaledGravity = GRAVITY * effectiveScale;
        const scaledJumpForce = JUMP_FORCE * effectiveScale;
        const scaledInitialUpwardBoost = INITIAL_UPWARD_BOOST * effectiveScale;
        const scaledBaseGameSpeed = BASE_GAME_SPEED * effectiveScale;
        const scaledMaxGameSpeed = MAX_GAME_SPEED * effectiveScale;
        const scaledSpeedIncreaseAmount = SPEED_INCREASE_AMOUNT * effectiveScale;
        const scaledBalloonVerticalSpeed = BALLOON_VERTICAL_SPEED * effectiveScale;
        const scaledBusterShotSpeed = BUSTER_SHOT_SPEED * effectiveScale;

        // If game is over, we don't update physics/logic, but we do draw the final state
        if (gameState.current.isGameOver) {
            drawGame(ctx, canvas, currentThemeColors, effectiveScale, scaledAgentSize, scaledAgentXPos);
            return;
        }

        // If game is not running (e.g., initial start screen or after reset), just draw it
        if (!gameState.current.isGameRunning) {
            drawGame(ctx, canvas, currentThemeColors, effectiveScale, scaledAgentSize, scaledAgentXPos);
            animationFrameId.current = requestAnimationFrame(gameLoop);
            return;
        }

        // 1. Update Agent Physics
        if (gameState.current.initialBoostTimer > 0) {
            gameState.current.agentVelocity = scaledInitialUpwardBoost * (gameState.current.initialBoostTimer / INITIAL_BOOST_DURATION);
            gameState.current.initialBoostTimer--;
        } else {
            gameState.current.agentVelocity += scaledGravity;
        }
        gameState.current.agentY += gameState.current.agentVelocity;

        // Boundary checks for agent (use scaled values)
        if (gameState.current.agentY < scaledAgentSize / 2) {
            gameState.current.agentY = scaledAgentSize / 2;
            gameState.current.agentVelocity = 0;
        }
        if (gameState.current.agentY > canvas.height - scaledAgentSize / 2) {
            gameState.current.agentY = canvas.height - scaledAgentSize / 2;
            if (!gameState.current.shieldActive) {
                gameState.current.health--;
                setPlayerHealth(gameState.current.health);
                gameState.current.damageFlashTimer = DAMAGE_FLASH_DURATION;
                gameState.current.damageText = { x: scaledAgentXPos, y: gameState.current.agentY - scaledAgentSize, text: '-1 HP', alpha: 1, vy: -1 * effectiveScale };
                playSound('hit');
            }
            if (gameState.current.health <= 0) {
                gameState.current.isGameOver = true;
                setIsGameOverScreen(true);
                playSound('gameOver');
            }
            if (gameState.current.isGameOver) return;
        }

        // Update shield timer
        if (gameState.current.shieldActive) {
            gameState.current.shieldTimer--;
            if (gameState.current.shieldTimer <= 0) {
                gameState.current.shieldActive = false;
            }
        }

        // Update buster timer and trigger shots
        if (gameState.current.busterActive) {
            gameState.current.busterTimer--;
            if (gameState.current.busterTimer <= 0) {
                gameState.current.busterActive = false;
            } else {
                const hostileBalloons = gameState.current.obstacles.filter(o => o.type === 'balloon');
                if (hostileBalloons.length > 0) {
                    if (gameState.current.projectiles.length < 1 && gameState.current.frameCount % 5 === 0) {
                        const targetBalloon = hostileBalloons[0];
                        gameState.current.projectiles.push({
                            x: scaledAgentXPos + scaledAgentSize / 2,
                            y: gameState.current.agentY,
                            targetX: targetBalloon.x,
                            targetY: targetBalloon.y,
                            type: 'buster_shot',
                            size: 5 * effectiveScale,
                            hit: false,
                        });
                        playSound('busterShot');
                    }
                }
            }
        }

        // Update projectile movement and collision with balloons
        for (let i = gameState.current.projectiles.length - 1; i >= 0; i--) {
            const p = gameState.current.projectiles[i];
            if (p.hit) {
                gameState.current.projectiles.splice(i, 1);
                continue;
            }

            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > scaledBusterShotSpeed) {
                p.x += (dx / distance) * scaledBusterShotSpeed;
                p.y += (dy / distance) * scaledBusterShotSpeed;
            } else {
                p.x = p.targetX;
                p.y = p.targetY;
                p.hit = true;

                const targetBalloonIndex = gameState.current.obstacles.findIndex(
                    o => o.type === 'balloon' && Math.abs(o.x - p.targetX) < (scaledBusterShotSpeed + scaledBalloonSize / 2) && Math.abs(o.y - p.targetY) < (scaledBusterShotSpeed + scaledBalloonSize / 2)
                );
                if (targetBalloonIndex !== -1) {
                    gameState.current.obstacles.splice(targetBalloonIndex, 1);
                }
            }

            if (p.x > canvas.width + 10 || p.x < -10 || p.y > canvas.height + 10 || p.y < -10) {
                gameState.current.projectiles.splice(i, 1);
            }
        }
        // Update damage flash timer
        if (gameState.current.damageFlashTimer > 0) {
            gameState.current.damageFlashTimer--;
        }

        // Update damage text animation
        if (gameState.current.damageText) {
            gameState.current.damageText.y += gameState.current.damageText.vy;
            gameState.current.damageText.alpha -= 0.02;
            if (gameState.current.damageText.alpha <= 0) {
                gameState.current.damageText = null;
            }
        }
        // 2. Update Obstacles and Collision Detection
        gameState.current.frameCount++;

        // Scaling for obstacle spawn interval based on scaled speed
        const currentWallSpawnInterval = Math.max(OBSTACLE_SPAWN_INTERVAL_MIN,
            OBSTACLE_SPAWN_INTERVAL_BASE - (gameState.current.currentSpeed / effectiveScale - BASE_GAME_SPEED) * 50);

        if (gameState.current.frameCount % Math.floor(currentWallSpawnInterval) === 0) {
            const topHeight = rand(scaledObstacleMinHeight, canvas.height - gameState.current.currentGapHeight - scaledObstacleMinHeight);
            gameState.current.obstacles.push({
                x: canvas.width,
                type: 'wall',
                topHeight: topHeight,
                bottomHeight: canvas.height - (topHeight + gameState.current.currentGapHeight),
                scored: false,
            });

            // Pickup spawn position also needs to be relative to canvas
            const pickupSpawnX = canvas.width + rand(50 * effectiveScale, 200 * effectiveScale);
            const pickupSpawnY = rand(scaledPickupSize, canvas.height - scaledPickupSize);

            const randomPickupChance = Math.random();
            if (randomPickupChance < HEALTH_SPAWN_CHANCE) {
                gameState.current.obstacles.push({ x: pickupSpawnX, y: pickupSpawnY, type: 'health', collected: false, size: scaledPickupSize });
            } else if (randomPickupChance < HEALTH_SPAWN_CHANCE + SHIELD_SPAWN_CHANCE) {
                gameState.current.obstacles.push({ x: pickupSpawnX, y: pickupSpawnY, type: 'shield', collected: false, size: scaledPickupSize });
            } else if (randomPickupChance < HEALTH_SPAWN_CHANCE + SHIELD_SPAWN_CHANCE + BUSTER_SPAWN_CHANCE) {
                gameState.current.obstacles.push({ x: pickupSpawnX, y: pickupSpawnY, type: 'buster', collected: false, size: scaledPickupSize });
            }
        }

        const currentBalloonSpawnInterval = Math.max(BALLOON_SPAWN_INTERVAL_MIN,
            BALLOON_SPAWN_INTERVAL_BASE - (gameState.current.currentSpeed / effectiveScale - BASE_GAME_SPEED) * 50);

        if (gameState.current.frameCount - gameState.current.lastBalloonFrame > currentBalloonSpawnInterval) {
            const spawnDirection = Math.random() < 0.5 ? 'bottom-to-top' : 'top-to-bottom';
            const initialY = spawnDirection === 'bottom-to-top' ? canvas.height + scaledBalloonSize : -scaledBalloonSize;
            const targetY = spawnDirection === 'bottom-to-top' ? -scaledBalloonSize : canvas.height + scaledBalloonSize;
            const xPos = rand(scaledAgentXPos + 100 * effectiveScale, canvas.width + BALLOON_SPAWN_HORIZONTAL_OFFSET * effectiveScale);

            gameState.current.obstacles.push({
                x: xPos,
                y: initialY,
                type: 'balloon',
                spawnDirection: spawnDirection,
                size: scaledBalloonSize,
            });
            gameState.current.lastBalloonFrame = gameState.current.frameCount;
        }
        for (let i = gameState.current.obstacles.length - 1; i >= 0; i--) {
            const obstacle = gameState.current.obstacles[i];
            obstacle.x -= gameState.current.currentSpeed;

            if (obstacle.type === 'balloon') {
                if (obstacle.spawnDirection === 'bottom-to-top') {
                    obstacle.y -= scaledBalloonVerticalSpeed;
                } else {
                    obstacle.y += scaledBalloonVerticalSpeed;
                }
            }

            // Collision detection uses scaled values
            const agentLeft = scaledAgentXPos - scaledAgentSize / 2;
            const agentRight = scaledAgentXPos + scaledAgentSize / 2;
            const agentTop = gameState.current.agentY - scaledAgentSize / 2;
            const agentBottom = gameState.current.agentY + scaledAgentSize / 2;

            let collided = false;
            let isDangerous = false;

            if (obstacle.type === 'wall') {
                isDangerous = true;
                const obstacleLeft = obstacle.x;
                const obstacleRight = obstacle.x + scaledObstacleWidth;
                const obstacleTopGap = obstacle.topHeight;
                const obstacleBottomGap = canvas.height - obstacle.bottomHeight;

                if (agentRight > obstacleLeft && agentLeft < obstacleRight) {
                    if (agentTop < obstacleTopGap || agentBottom > obstacleBottomGap) {
                        collided = true;
                    }
                }
            } else if (obstacle.type === 'balloon') {
                isDangerous = true;
                const balloonLeft = obstacle.x - obstacle.size / 2;
                const balloonRight = obstacle.x + obstacle.size / 2;
                const balloonTop = obstacle.y - obstacle.size / 2;
                const balloonBottom = obstacle.y + obstacle.size / 2;

                if (agentRight > balloonLeft && agentLeft < balloonRight &&
                    agentBottom > balloonTop && agentTop < balloonBottom) {
                    collided = true;
                }
            } else if (obstacle.type === 'health' || obstacle.type === 'shield' || obstacle.type === 'buster') {
                const pickupLeft = obstacle.x - obstacle.size / 2;
                const pickupRight = obstacle.x + obstacle.size / 2;
                const pickupTop = obstacle.y - obstacle.size / 2;
                const pickupBottom = obstacle.y + obstacle.size / 2;

                if (agentRight > pickupLeft && agentLeft < pickupRight &&
                    agentBottom > pickupTop && agentTop < pickupBottom) {

                    if (!obstacle.collected) {
                        obstacle.collected = true;
                        playSound('pickup');
                        if (obstacle.type === 'health') {
                            if (gameState.current.health < gameState.current.maxHealth) {
                                gameState.current.health = Math.min(gameState.current.health + 1, gameState.current.maxHealth);
                                setPlayerHealth(gameState.current.health);
                            }
                        } else if (obstacle.type === 'shield') {
                            gameState.current.shieldActive = true;
                            gameState.current.shieldTimer = SHIELD_DURATION;
                        } else if (obstacle.type === 'buster') {
                            gameState.current.busterActive = true;
                            gameState.current.busterTimer = BUSTER_DURATION;
                            playSound('busterActivate');
                        }
                    }
                }
            }

            if (collided && isDangerous) {
                if (!gameState.current.shieldActive) {
                    gameState.current.health--;
                    setPlayerHealth(gameState.current.health);
                    gameState.current.damageFlashTimer = DAMAGE_FLASH_DURATION;
                    gameState.current.damageText = { x: scaledAgentXPos, y: gameState.current.agentY - scaledAgentSize, text: '-1 HP', alpha: 1, vy: -1 * effectiveScale };
                    playSound('hit');
                }
                gameState.current.obstacles.splice(i, 1);
                if (gameState.current.health <= 0) {
                    gameState.current.isGameOver = true;
                    setIsGameOverScreen(true);
                    playSound('gameOver');
                    return;
                }
            }

            if (obstacle.type === 'wall' && !obstacle.scored && agentLeft > obstacle.x + scaledObstacleWidth) {
                obstacle.scored = true;
                gameState.current.score++;
                setCurrentScore(gameState.current.score);

                if (gameState.current.score % SPEED_INCREASE_INTERVAL === 0 && gameState.current.currentSpeed < scaledMaxGameSpeed) {
                    gameState.current.currentSpeed = Math.min(scaledMaxGameSpeed, gameState.current.currentSpeed + scaledSpeedIncreaseAmount);
                }
                if (gameState.current.score % GAP_DECREASE_INTERVAL === 0 && gameState.current.currentGapHeight > scaledMinObstacleGapHeight) {
                    gameState.current.currentGapHeight = Math.max(scaledMinObstacleGapHeight, gameState.current.currentGapHeight - GAP_DECREASE_AMOUNT * effectiveScale);
                }
            }

            const obstacleOffScreen = obstacle.x + (obstacle.size || scaledObstacleWidth) < 0;
            let balloonPastScreen = false;
            if (obstacle.type === 'balloon') {
                balloonPastScreen = (obstacle.spawnDirection === 'bottom-to-top' && obstacle.y < -scaledBalloonSize) ||
                    (obstacle.spawnDirection === 'top-to-bottom' && obstacle.y > canvas.height + scaledBalloonSize);
            }

            if (obstacleOffScreen || obstacle.collected || balloonPastScreen) {
                gameState.current.obstacles.splice(i, 1);
            }
        }

        // Update background offset for subtle scrolling effect of the grid
        gameState.current.backgroundOffset = (gameState.current.backgroundOffset - 0.2 * effectiveScale) % canvas.width;

        // Add trail particle (optimized to limit total particles)
        if (gameState.current.trailParticles.length < MAX_PARTICLES) {
            for (let j = 0; j < PARTICLE_SPAWN_RATE; j++) {
                gameState.current.trailParticles.push({
                    x: scaledAgentXPos - scaledAgentSize * 0.4,
                    y: gameState.current.agentY + rand(-scaledAgentSize / 4, scaledAgentSize / 4),
                    size: rand(PARTICLE_SIZE_RANGE[0], PARTICLE_SIZE_RANGE[1]) * effectiveScale,
                    alpha: 1,
                    vy: rand(-2, 2) * effectiveScale,
                    vx: -gameState.current.currentSpeed * 0.2,
                });
            }
        }

        // Update and remove old particles
        for (let i = gameState.current.trailParticles.length - 1; i >= 0; i--) {
            const p = gameState.current.trailParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= PARTICLE_ALPHA_DECAY;
            p.size *= PARTICLE_SHRINK_RATE;
            if (p.alpha <= 0.1 || p.size <= 1 * effectiveScale) {
                gameState.current.trailParticles.splice(i, 1);
            }
        }

        drawGame(ctx, canvas, currentThemeColors, effectiveScale, scaledAgentSize, scaledAgentXPos);

        animationFrameId.current = requestAnimationFrame(gameLoop);

    }, [canvasDimensions, currentThemeColors, isGameFullscreen, playSound, unlockAndLoadAudio]); // Added playSound and unlockAndLoadAudio dependencies

    // --- Drawing Function (Uses current state from gameState.current) ---
    const drawGame = (ctx, canvas, colors, scale, scaledAgentSize, scaledAgentXPos) => {
        const hue = (gameState.current.frameCount * 0.5) % 360;
        const agentHue = (gameState.current.frameCount * 1.5) % 360;

        const dynamicObstacleColor = `hsl(${hue}, 100%, 50%)`;
        const dynamicObstacleGlowColor = `hsl(${(hue + 180) % 360}, 100%, 50%)`;

        let currentAgentPrimaryColor = `hsl(${agentHue}, 100%, 60%)`;
        let currentAgentGlowColor = `hsl(${(agentHue + 90) % 360}, 100%, 60%)`;
        if (gameState.current.damageFlashTimer > 0) {
            currentAgentPrimaryColor = colors.damageFlash;
            currentAgentGlowColor = colors.damageFlash;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Canvas background
        if (colors.background.startsWith('linear-gradient')) {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            const colorMatches = colors.background.match(/rgb\(\d+,\s*\d+,\s*\d+\)|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g);
            if (colorMatches && colorMatches.length >= 2) {
                gradient.addColorStop(0, colorMatches[0]);
                gradient.addColorStop(1, colorMatches[colorMatches.length - 1]);
            } else {
                gradient.addColorStop(0, colors.background);
                gradient.addColorStop(1, colors.background);
            }
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = colors.background;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid pattern
        ctx.strokeStyle = colors.gridLine;
        ctx.lineWidth = 1 * scale;
        const gridSize = 80 * scale;

        ctx.beginPath();
        for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
            const offsetX = (x + gameState.current.backgroundOffset) % gridSize;
            ctx.moveTo(x + offsetX, 0);
            ctx.lineTo(x + offsetX, canvas.height);
        }
        for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
            const offsetY = (y + gameState.current.backgroundOffset) % gridSize;
            ctx.moveTo(0, y + offsetY);
            ctx.lineTo(canvas.width, y + offsetY);
        }
        ctx.stroke();

        // Draw Trail Particles
        for (const p of gameState.current.trailParticles) {
            ctx.fillStyle = `${colors.trailParticle.substring(0, colors.trailParticle.lastIndexOf(','))}, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Agent
        ctx.save();
        ctx.translate(scaledAgentXPos, gameState.current.agentY);
        const rotationAngle = gameState.current.agentVelocity * 0.08;
        ctx.rotate(rotationAngle);

        ctx.fillStyle = currentAgentPrimaryColor;
        ctx.beginPath();
        ctx.moveTo(-scaledAgentSize * 0.6, -scaledAgentSize / 2);
        ctx.lineTo(scaledAgentSize * 0.6, 0);
        ctx.lineTo(-scaledAgentSize * 0.6, scaledAgentSize / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = colors.agentSecondary;
        ctx.beginPath();
        ctx.moveTo(-scaledAgentSize * 0.4, -scaledAgentSize / 3);
        ctx.lineTo(scaledAgentSize * 0.4, 0);
        ctx.lineTo(-scaledAgentSize * 0.4, scaledAgentSize / 3);
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = currentAgentGlowColor;
        ctx.shadowBlur = 20 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (gameState.current.agentVelocity < 0) {
            ctx.fillStyle = colors.thrustParticle;
            ctx.shadowColor = colors.thrustParticle;
            ctx.shadowBlur = 8 * scale;
            ctx.beginPath();
            ctx.moveTo(-scaledAgentSize * 0.6, -scaledAgentSize / 4);
            ctx.lineTo(-scaledAgentSize * 0.6 - 20 * scale * (gameState.current.agentVelocity / (JUMP_FORCE * scale)), 0);
            ctx.lineTo(-scaledAgentSize * 0.6, scaledAgentSize / 4);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        ctx.restore();

        // Draw active shield effect
        if (gameState.current.shieldActive) {
            ctx.beginPath();
            const pulse = Math.sin(gameState.current.frameCount * 0.1) * 0.1 + 1;
            ctx.arc(scaledAgentXPos, gameState.current.agentY, scaledAgentSize * 1.2 * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = colors.shieldActiveGlow;
            ctx.lineWidth = 5 * scale;
            ctx.shadowColor = colors.shieldActiveGlow;
            ctx.shadowBlur = 15 * scale;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
        // Draw active buster effect
        if (gameState.current.busterActive) {
            ctx.beginPath();
            const pulse = Math.sin(gameState.current.frameCount * 0.15) * 0.1 + 1;
            ctx.arc(scaledAgentXPos, gameState.current.agentY, scaledAgentSize * 1.3 * pulse, 0, Math.PI * 2);
            ctx.strokeStyle = colors.busterActiveGlow;
            ctx.lineWidth = 4 * scale;
            ctx.shadowColor = colors.busterActiveGlow;
            ctx.shadowBlur = 12 * scale;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // Draw Obstacles
        for (const obstacle of gameState.current.obstacles) {
            const scaledObstacleWidth = OBSTACLE_WIDTH * scale;
            const scaledBalloonSize = BALLOON_SIZE * scale;
            const scaledPickupSize = PICKUP_SIZE * scale;

            if (obstacle.type === 'wall') {
                ctx.fillStyle = dynamicObstacleColor;
                ctx.fillRect(obstacle.x, 0, scaledObstacleWidth, obstacle.topHeight);
                ctx.fillRect(obstacle.x, canvas.height - obstacle.bottomHeight, scaledObstacleWidth, obstacle.bottomHeight);

                ctx.shadowColor = dynamicObstacleGlowColor;
                ctx.shadowBlur = 10 * scale;
                ctx.strokeStyle = dynamicObstacleColor;
                ctx.lineWidth = 3 * scale;
                ctx.strokeRect(obstacle.x, 0, scaledObstacleWidth, obstacle.topHeight);
                ctx.strokeRect(obstacle.x, canvas.height - obstacle.bottomHeight, scaledObstacleWidth, obstacle.bottomHeight);
                ctx.shadowBlur = 0;
            } else if (obstacle.type === 'balloon') {
                ctx.fillStyle = colors.hostileBalloon;
                ctx.beginPath();
                ctx.arc(obstacle.x, obstacle.y, scaledBalloonSize / 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = colors.hostileBalloonGlow;
                ctx.lineWidth = 2 * scale;
                const spikeCount = 8;
                for (let i = 0; i < spikeCount; i++) {
                    const angle = (i / spikeCount) * Math.PI * 2;
                    const innerX = obstacle.x + (scaledBalloonSize / 2) * Math.cos(angle);
                    const innerY = obstacle.y + (scaledBalloonSize / 2) * Math.sin(angle);
                    const outerX = obstacle.x + (scaledBalloonSize / 2 + 10 * scale) * Math.cos(angle);
                    const outerY = obstacle.y + (scaledBalloonSize / 2 + 10 * scale) * Math.sin(angle);
                    ctx.beginPath();
                    ctx.moveTo(innerX, innerY);
                    ctx.lineTo(outerX, outerY);
                    ctx.stroke();
                }

                ctx.shadowColor = colors.hostileBalloonGlow;
                ctx.shadowBlur = 8 * scale;
                ctx.beginPath();
                ctx.arc(obstacle.x, obstacle.y, scaledBalloonSize / 2, 0, Math.PI * 2);
                ctx.stroke();
                ctx.shadowBlur = 0;
            } else if (obstacle.type === 'health') {
                ctx.fillStyle = colors.healthPickup;
                const heartSize = scaledPickupSize * 0.8;
                ctx.beginPath();
                ctx.moveTo(obstacle.x, obstacle.y + heartSize * 0.3);
                ctx.bezierCurveTo(
                    obstacle.x + heartSize * 0.5, obstacle.y - heartSize * 0.4,
                    obstacle.x + heartSize * 0.8, obstacle.y + heartSize * 0.1,
                    obstacle.x, obstacle.y + heartSize * 0.7
                );
                ctx.bezierCurveTo(
                    obstacle.x - heartSize * 0.8, obstacle.y + heartSize * 0.1,
                    obstacle.x - heartSize * 0.5, obstacle.y - heartSize * 0.4,
                    obstacle.x, obstacle.y + heartSize * 0.3
                );
                ctx.closePath();
                ctx.fill();
                ctx.shadowColor = colors.healthPickup;
                ctx.shadowBlur = 8 * scale;
                ctx.fill();
                ctx.shadowBlur = 0;
            } else if (obstacle.type === 'shield') {
                ctx.fillStyle = colors.shieldPickup;
                const shieldSize = scaledPickupSize;
                ctx.beginPath();
                ctx.moveTo(obstacle.x, obstacle.y - shieldSize * 0.5);
                ctx.lineTo(obstacle.x + shieldSize * 0.5, obstacle.y - shieldSize * 0.2);
                ctx.lineTo(obstacle.x + shieldSize * 0.5, obstacle.y + shieldSize * 0.5);
                ctx.lineTo(obstacle.x, obstacle.y + shieldSize * 0.6);
                ctx.lineTo(obstacle.x - shieldSize * 0.5, obstacle.y + shieldSize * 0.5);
                ctx.lineTo(obstacle.x - shieldSize * 0.5, obstacle.y - shieldSize * 0.2);
                ctx.closePath();
                ctx.fill();

                ctx.shadowColor = colors.shieldPickup;
                ctx.shadowBlur = 8 * scale;
                ctx.fill();
                ctx.shadowBlur = 0;
            } else if (obstacle.type === 'buster') {
                ctx.fillStyle = colors.busterPickup;
                const busterSize = scaledPickupSize;
                ctx.beginPath();
                ctx.arc(obstacle.x, obstacle.y, busterSize / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = colors.busterShot;
                ctx.lineWidth = 2 * scale;
                ctx.beginPath();
                ctx.moveTo(obstacle.x - busterSize / 2, obstacle.y);
                ctx.lineTo(obstacle.x + busterSize / 2, obstacle.y);
                ctx.moveTo(obstacle.x, obstacle.y - busterSize / 2);
                ctx.lineTo(obstacle.x, obstacle.y + busterSize / 2);
                ctx.stroke();

                ctx.shadowColor = colors.busterPickup;
                ctx.shadowBlur = 8 * scale;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Draw Projectiles
        for (const projectile of gameState.current.projectiles) {
            if (!projectile.hit) {
                ctx.fillStyle = colors.busterShot;
                ctx.beginPath();
                ctx.arc(projectile.x, projectile.y, projectile.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowColor = colors.busterShot;
                ctx.shadowBlur = 3 * scale;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        // Draw floating damage text
        if (gameState.current.damageText) {
            ctx.fillStyle = `rgba(255, 255, 255, ${gameState.current.damageText.alpha})`;
            ctx.font = `bold ${20 * scale}px Orbitron, Arial`;
            ctx.textAlign = 'center';
            ctx.fillText(gameState.current.damageText.text, gameState.current.damageText.x, gameState.current.damageText.y);
        }
        // Draw Game Over overlay
        if (gameState.current.isGameOver) {
            ctx.fillStyle = colors.gameOverBg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = colors.gameOverHeading;
            ctx.font = `bold ${48 * scale}px Orbitron, Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('MISSION FAILED!', canvas.width / 2, canvas.height / 2 - 30 * scale);
            ctx.fillStyle = colors.gameOverScoreText;
            ctx.font = `bold ${30 * scale}px Orbitron, Arial`;
            ctx.fillText(`Score: ${currentScore}`, canvas.width / 2, canvas.height / 2 + 20 * scale);
        }
        // Instructions for start screen
        if (!gameState.current.isGameRunning && !gameState.current.isGameOver) {
            ctx.fillStyle = colors.instructionText;
            ctx.font = `bold ${30 * scale}px Orbitron, Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('CLICK / TAP / SPACE TO START', canvas.width / 2, canvas.height / 2);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && canvasDimensions.width > 0) {
            canvas.width = canvasDimensions.width;
            canvas.height = canvasDimensions.height;
            gameState.current.agentY = canvasDimensions.height / 2;

            if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(gameLoop);
            }
        }
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [gameLoop, canvasDimensions]);

    const handleInput = useCallback(() => {
        if (gameState.current.isGameOver) {
            resetGame();
            return;
        }

        if (!gameState.current.isGameRunning) {
            startGame();
            return;
        }

        const scaledJumpForce = JUMP_FORCE * Math.min(canvasDimensions.width / REFERENCE_GAME_WIDTH, canvasDimensions.height / REFERENCE_GAME_HEIGHT);

        if (gameState.current.initialBoostTimer <= 0) {
            gameState.current.agentVelocity = scaledJumpForce;
            console.log("Attempting to play jump sound from handleInput()");
            playSound('jump', 4);
        }

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }, [canvasDimensions, playSound]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleKeyPress = (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                handleInput();
            }
        };

        const handleClick = (e) => {
            if (canvas.contains(e.target)) {
                e.preventDefault();
                handleInput();
            }
        };

        const handleTouch = (e) => {
            if (canvas.contains(e.target)) {
                e.preventDefault();
                handleInput();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        canvas.addEventListener('mousedown', handleClick);
        canvas.addEventListener('touchstart', handleTouch, { passive: false });

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            if (canvas) {
                canvas.removeEventListener('mousedown', handleClick);
                canvas.removeEventListener('touchstart', handleTouch);
            }
        };
    }, [handleInput]);

    const startGame = () => {
        const effectiveScale = Math.min(canvasDimensions.width / REFERENCE_GAME_WIDTH, canvasDimensions.height / REFERENCE_GAME_HEIGHT);
        const scaledBaseGameSpeed = BASE_GAME_SPEED * effectiveScale;
        const scaledBaseObstacleGapHeight = BASE_OBSTACLE_GAP_HEIGHT * effectiveScale;

        gameState.current = {
            agentY: canvasDimensions.height / 2,
            agentVelocity: 0,
            obstacles: [],
            projectiles: [],
            score: 0,
            frameCount: 0,
            isGameOver: false,
            isGameRunning: true,
            backgroundOffset: 0,
            trailParticles: [],
            initialBoostTimer: INITIAL_BOOST_DURATION,
            currentSpeed: scaledBaseGameSpeed,
            currentGapHeight: scaledBaseObstacleGapHeight,
            health: INITIAL_HEALTH,
            maxHealth: MAX_PLAYER_HEALTH,
            shieldActive: false,
            shieldTimer: 0,
            busterActive: false,
            busterTimer: 0,
            lastBalloonFrame: 0,
            damageFlashTimer: 0,
            damageText: null,
        };
        setCurrentScore(0);
        setIsGameOverScreen(false);
        setIsGameStarted(true);
        setPlayerHealth(INITIAL_HEALTH);

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    const resetGame = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }

        const effectiveScale = Math.min(canvasDimensions.width / REFERENCE_GAME_WIDTH, canvasDimensions.height / REFERENCE_GAME_HEIGHT);
        const scaledBaseGameSpeed = BASE_GAME_SPEED * effectiveScale;
        const scaledBaseObstacleGapHeight = BASE_OBSTACLE_GAP_HEIGHT * effectiveScale;

        gameState.current = {
            agentY: canvasDimensions.height / 2,
            agentVelocity: 0,
            obstacles: [],
            projectiles: [],
            score: 0,
            frameCount: 0,
            isGameOver: false,
            isGameRunning: false,
            backgroundOffset: 0,
            trailParticles: [],
            initialBoostTimer: 0,
            currentSpeed: scaledBaseGameSpeed,
            currentGapHeight: scaledBaseObstacleGapHeight,
            health: INITIAL_HEALTH,
            maxHealth: MAX_PLAYER_HEALTH,
            shieldActive: false,
            shieldTimer: 0,
            busterActive: false,
            busterTimer: 0,
            lastBalloonFrame: 0,
            damageFlashTimer: 0,
            damageText: null,
        };
        setCurrentScore(0);
        setIsGameOverScreen(false);
        setIsGameStarted(false);
        setPlayerHealth(INITIAL_HEALTH);

        animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    const toggleFullscreen = () => {
        const elem = gameContainerRef.current;

        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
    };

    const effectiveUIScale = Math.min(
        canvasDimensions.width / REFERENCE_GAME_WIDTH,
        canvasDimensions.height / REFERENCE_GAME_HEIGHT
    );
    // Adjusted font sizes with lower minimums if needed, or higher maximums for larger screens.
    // Clamp values using Math.max for minimum and a hardcoded max for visual consistency.
    const titleFontSize = Math.min(40, Math.max(18, 2.5 * 16 * effectiveUIScale));
    const scoreHealthFontSize = Math.min(24, Math.max(14, 1.2 * 16 * effectiveUIScale));
    const instructionFontSize = Math.min(20, Math.max(12, 1.0 * 16 * effectiveUIScale));
    const mobileInstructionFontSize = Math.max(12, 0.9 * 16 * effectiveUIScale);

    return (
        <div ref={gameContainerRef} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center content horizontally
            justifyContent: 'center', // Center content vertically
            minHeight: '80vh', // Ensure enough height for vertical centering on initial load
            padding: '10px',
            backgroundColor: currentThemeColors.background.startsWith('linear-gradient') ? 'transparent' : currentThemeColors.background,
            backgroundImage: currentThemeColors.background.startsWith('linear-gradient') ? currentThemeColors.background : 'none',
            borderRadius: '15px',
            border: `3px solid ${currentThemeColors.containerBorder}`,
            boxShadow: `0 0 30px ${currentThemeColors.containerBoxShadow}`,
            fontFamily: '"Orbitron", Arial, sans-serif',
            color: currentThemeColors.heading,
            maxWidth: '95vw', // Allow container to take up more width
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
            /* Ensure smooth transition for fullscreen */
            /* These styles apply to the element that goes fullscreen */
            [data-fullscreen="true"] {
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: black; /* Ensure black background if there's letter/pillarboxing */
            }

            /* Adjustments for canvas when its parent is fullscreen */
            [data-fullscreen="true"] canvas {
                width: 100% !important;
                height: 100% !important;
                max-width: 100% !important;
                max-height: 100% !important;
                object-fit: contain; /* Important: maintains aspect ratio, adds letter/pillarboxing if needed */
                margin: 0;
            }

            /* Hide scrollbar in fullscreen if content overflows slightly */
            html:-webkit-full-screen { overflow: hidden; }
            html:-moz-full-screen { overflow: hidden; }
            html:-ms-fullscreen { overflow: hidden; }
            html:fullscreen { overflow: hidden; }
        `}</style>

            <h2 style={{
                color: currentThemeColors.heading,
                fontSize: `${titleFontSize}px`,
                marginBottom: '10px',
                textShadow: `0 0 10px ${currentThemeColors.heading}`,
                textAlign: 'center',
                lineHeight: '1.2',
                whiteSpace: 'nowrap' // Prevent wrapping on smaller screens for the title
            }}>
                AGENT GLITCH DASH
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: canvasDimensions.width + 'px', marginBottom: '10px', padding: '0 5px' }}>
                <p style={{
                    color: currentThemeColors.scoreText,
                    fontSize: `${scoreHealthFontSize}px`,
                    textAlign: 'left',
                    flex: 1,
                    whiteSpace: 'nowrap'
                }}>
                    Score: {currentScore}
                </p>
                <p style={{
                    color: currentThemeColors.healthText,
                    fontSize: `${scoreHealthFontSize}px`,
                    textAlign: 'right',
                    flex: 1,
                    whiteSpace: 'nowrap'
                }}>
                    Health: {playerHealth}
                </p>
            </div>

            {isGameOverScreen && (
                <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: currentThemeColors.gameOverBg,
                    borderRadius: '10px',
                    marginBottom: '20px',
                    border: `2px solid ${currentThemeColors.gameOverHeading}`,
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <h3 style={{
                        color: currentThemeColors.gameOverHeading,
                        fontSize: `${Math.max(20, 24 * effectiveUIScale)}px`,
                        marginBottom: '10px',
                        textShadow: `0 0 10px ${currentThemeColors.gameOverHeading}`
                    }}>
                        MISSION FAILED!
                    </h3>
                    <p style={{ color: currentThemeColors.gameOverScoreText, marginBottom: '15px', fontSize: `${Math.max(14, 16 * effectiveUIScale)}px` }}>
                        Final Score: {currentScore}
                    </p>
                    <button
                        onClick={resetGame}
                        style={{
                            padding: '12px 25px',
                            fontSize: `${Math.max(14, 16 * effectiveUIScale)}px`,
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: currentThemeColors.tryAgainBtnBg,
                            border: `2px solid ${currentThemeColors.tryAgainBtnBorder}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}
                    >
                        TRY AGAIN
                    </button>
                </div>
            )}
            <canvas
                ref={canvasRef}
                width={canvasDimensions.width}
                height={canvasDimensions.height}
                style={{
                    border: `3px solid ${currentThemeColors.canvasBorder}`,
                    borderRadius: '10px',
                    backgroundColor: 'transparent',
                    boxShadow: `0 0 20px ${currentThemeColors.canvasBoxShadow}`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    height: 'auto',
                    cursor: 'pointer',
                    display: 'block',
                    objectFit: 'contain',
                    position: 'relative'
                }}
            />
            {/* Fullscreen button */}
            {document.fullscreenEnabled && (
                <button
                    onClick={toggleFullscreen}
                    style={{
                        position: 'absolute',
                        bottom: '15px',
                        right: '15px',
                        padding: '10px 15px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        backgroundColor: currentThemeColors.fullscreenBtnBg,
                        color: currentThemeColors.fullscreenBtnText,
                        border: `2px solid ${currentThemeColors.containerBorder}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        zIndex: 20,
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        // The corrected line is here:
                        display: !isGameOverScreen ? 'block' : 'none'
                    }}
                >
                    {isGameFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
            )}

            <div style={{
                marginTop: '10px',
                textAlign: 'center',
                color: currentThemeColors.instructionText,
                fontSize: `${instructionFontSize}px`
            }}>
                <p>Click, tap, or press SPACE to jump</p>
            </div>

            {/* New: Mobile Portrait Instruction */}
            {isMobilePortrait && !isGameStarted && !isGameOverScreen && (
                <div style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    color: currentThemeColors.instructionText,
                    fontSize: `${mobileInstructionFontSize}px`,
                    whiteSpace: 'normal', // Allow text to wrap
                    maxWidth: '90%', // Limit width
                    lineHeight: '1.4'
                }}>
                    <p>For a larger game experience, consider rotating your device to landscape mode.</p>
                </div>
            )}
        </div>
    );
}
