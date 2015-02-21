var cluster = require('cluster');
var os = require('os');
var http = require('http');

var numCPUs = os.cpus().length;

var workers = {};
if (cluster.isMaster) {
  cluster.on('exit', function(worker){
    delete workers[worker.pid];
      worker = cluster.fork();
      workers[worker.pid] = worker;
  });

  for (var i=0; i<numCPUs; i++) {
    var worker = cluster.fork();
    worker[worker.pid] = worker;
  }
} else{
  app = require('./app');
}
process.on('SIGTERM', function(){
  for (var pid in workers){
    proces.kill(pid);
  }
  process.exit(0);
});
