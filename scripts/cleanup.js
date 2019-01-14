const execSync = require('child_process').execSync
const dayjs = require('dayjs')

const daysAgo = 7
const dayToClean = () => dayjs().subtract(daysAgo, 'day').format('YYYY-MM-DD');

owner = 'bogdan'
command = `/home/pi/google-cloud-sdk/bin/gsutil rm -r gs://monitor-garage.appspot.com/garage/${owner}-${dayToClean()}`

console.log("Starig command:", command)
const output = execSync(command, {encoding: 'utf-8', stdio: 'inherit' });
console.log(`Cleanup for day ${dayToClean()} finished successfully`);
