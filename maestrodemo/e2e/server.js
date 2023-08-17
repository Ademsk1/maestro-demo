const {execSync} = require('child_process');
const Fastify = require('fastify');

//as either the ios or android will be passed in, we'll need to place it in an environment variable when calling maestro.

const ANDROID_SETUP_LOCKSETTINGS =
  "adb shell locksettings set-pin '1111' && adb shell am start -a android.settings.SECURITY_SETTINGS";
const ANDROID_TOUCHID_PASS = 'adb -e emu finger touch 1';
const ANDROID_TOUCHID_FAIL = 'adb -e emu finger touch 2';
const PROCESSES = ['setup', 'pass', 'fail'];
const biometricsIOS = process => {
  if (!PROCESSES.includes(process)) {
    throw new Error(`Process can only be one of three: ${PROCESSES}`);
  }
  if (process === 'setup') {
    return "xcrun simctl spawn booted notifyutil -s com.apple.BiometricKit.enrollmentChanged '1' && xcrun simctl spawn booted notifyutil -p com.apple.BiometricKit.enrollmentChanged";
  } else if (process === 'pass') {
    return 'xcrun simctl spawn booted notifyutil -p com.apple.BiometricKit_Sim.fingerTouch.match';
  } else if (process === 'fail') {
    return 'xcrun simctl spawn booted notifyutil -p com.apple.BiometricKit_Sim.fingerTouch.nomatch';
  }
};

const execute = cmd => {
  return execSync(cmd, function (error, stdout, stderr) {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error) {
      console.log(`exec error: ${error}`);
    }
  }).toString();
};

const buildServer = () => {
  const server = Fastify({
    logger: true,
  });
  let cmd;

  server.get('/ios/:process', async req => {
    const process = req.params.process;
    cmd = biometricsIOS(process);
    execute(cmd);
  });
  server.get('/android/:process', async req => {
    const {process} = req.params;
    if (process === 'setup-pin') {
      cmd = ANDROID_SETUP_LOCKSETTINGS;
    } else if (process === 'setup-fingerprint' || process === 'pass') {
      cmd = ANDROID_TOUCHID_PASS;
    } else {
      cmd = ANDROID_TOUCHID_FAIL;
    }
    execute(cmd);
  });
  server.listen({port: 5173, host: '0.0.0.0'});
};

buildServer();
