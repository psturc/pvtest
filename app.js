const fs = require('fs')
const http = require('http')
const assert = require('assert')

const testString = 'test string'
const pathToFile = process.env.PATH_TO_TESTFILE
const port = process.env.PORT

function testFileWriteToPV() {
  return new Promise(function(resolve) {
    fs.writeFile(pathToFile, testString, function (err) {
      assert.ifError(err)
      console.log('Test of write access to the Persistent Volume succeeded')
      console.log('Data stored in the path:', pathToFile)
      resolve()
    })
  })
}

function testFileReadFromPV() {
  return new Promise(function(resolve) {
    fs.readFile(pathToFile, 'utf-8', function (err, data) {
      assert.ifError(err)
      assert.equal(data, testString, 'String written to file should be equal to the one that has been read')
      console.log('Data from PV read successfully.')
      resolve()
    })
  })
}

function startTheServer() {
  return new Promise(function(resolve) {
    const app = http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end(testString)
    })
    app.listen(port, function() {
      console.log('HTTP server started successfully on port', port)
      resolve()
    })
  })
}

function readDataFromHttpServer() {
  http.get('http://localhost:' + 8080, function(res) {
    res.setEncoding('utf-8')
    res.on('data', function (data) {
      assert.equal(data, testString, 'String from file should be equal to response data')
    })
  })
}


testFileWriteToPV(pathToFile)
.then(testFileReadFromPV)
.then(startTheServer)
.then(readDataFromHttpServer)

