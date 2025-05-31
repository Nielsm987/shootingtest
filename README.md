# Paddle Game with Gyroscope Control

A simple paddle and ball game that uses the gyroscope in iOS devices to control the paddle movement.

## Features

- Gyroscope-controlled paddle movement
- Mobile-optimized interface
- Debug information for troubleshooting
- Double-tap to recalibrate gyroscope

## How to Play

1. Open the game on your iOS device
2. Tap the "Tap to Start Game" button
3. Grant permission to use the gyroscope when prompted
4. Tilt your device left and right to move the paddle
5. Try to keep the ball from falling off the bottom of the screen

## Gyroscope Controls

- The game uses the device's gyroscope to detect tilting
- Initial position when you start the game is considered "neutral"
- Tilt left to move the paddle left
- Tilt right to move the paddle right
- Double-tap anywhere on the screen to recalibrate the gyroscope

## Troubleshooting

If the gyroscope controls aren't working:

1. Make sure you're using a device with a gyroscope (most modern smartphones)
2. Ensure you've granted permission to use the gyroscope
3. Check the debug information at the bottom of the screen for error messages
4. Try double-tapping to recalibrate the gyroscope
5. Ensure you're accessing the game over HTTPS (required for sensor access)

## Deploying to GitHub Pages

1. Push all files to your GitHub repository
2. Go to your repository settings
3. Scroll down to the "GitHub Pages" section
4. Select the branch you want to deploy (usually `main` or `master`)
5. Click "Save"
6. Your game will be available at `https://[your-username].github.io/[repository-name]/`

## Technical Details

- The game uses the DeviceOrientationEvent API to access the gyroscope
- iOS 13+ requires explicit permission via DeviceOrientationEvent.requestPermission()
- The game must be served over HTTPS for the gyroscope to work
- GitHub Pages automatically serves content over HTTPS

## Development

To modify or enhance the game:

1. Clone the repository
2. Make your changes to the HTML, CSS, or JavaScript files
3. Test locally using a mobile device or emulator
4. Push changes to GitHub to update the deployed version

## Files

- `index.html` - The main HTML structure
- `style.css` - Styling for the game
- `script.js` - Game logic and gyroscope handling
- `README.md` - This documentation file
