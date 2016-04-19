'use strict';

import fs          from 'fs';
import gulp        from 'gulp';
import onlyScripts from './util/scriptFilter';

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

// Ensure process ends after all Gulp tasks are finished
gulp.on('stop', () => {
  if (!global.isWatching) {
    process.nextTick(() => {
      process.exit(0);
    });
  }
});

tasks.forEach((task) => {
  require('./tasks/' + task);
});


gulp.task('default', ['watch']);
