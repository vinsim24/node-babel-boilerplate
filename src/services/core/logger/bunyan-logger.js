import bunyan from 'bunyan';
import RotatingFileStream from 'bunyan-rotating-file-stream';
import config from '../config';
import moment from "moment-timezone";

//import bformat from 'bunyan-format';

const loggerConfig = {
    name: 'pubedit-slac-slash',
    level: config.get('LOGGER_LEVEL'),
    localtime: moment().tz('America/New_York').format(),
    //stream: formatOut,
    /*streams: [{
        type: 'rotating-file',
        path: config.get('LOG_FILE_FULL_PATH'),
        period:config.get('LOG_FILE_ROTATE_PERIOD'),
        count: config.get('LOG_FILE_RETAIN_NUMBER_OF_FILES')
    }]*/
    streams: [{
        type: 'raw',
        stream: new RotatingFileStream({
            path: config.get('LOG_FILE_FULL_PATH'),
            period: config.get('LOG_FILE_ROTATE_PERIOD'),          // daily rotation
            totalFiles: config.get('LOG_FILE_RETAIN_NUMBER_OF_FILES'),        // keep 10 back copies
            rotateExisting: false,  // Give ourselves a clean file when we start up, based on period
            threshold: config.get('LOG_FILE_ROTATE_THRESHOLD_SIZE'),      // Rotate log files larger than 20 megabytes
            totalSize: config.get('LOG_FILES_TOTALSIZE'),      // Don't keep more than 500mb of archived log files
            gzip: false,             // Compress the archive log files to save space
        })
    }]
};

export default bunyan.createLogger(loggerConfig);