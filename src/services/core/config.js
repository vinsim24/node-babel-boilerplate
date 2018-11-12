import nconf from 'nconf';
import {join} from 'path';

nconf.argv().env();

const envVar = nconf.get('NODE_ENV');
nconf.file('environment', join(__dirname, '..', '..', 'config', envVar + '.json'));

nconf.file('defaults', join(__dirname, '..', '..', 'config', 'default.json'));

export default nconf;
