// Dependencies
const chokidar = require('chokidar')
const fs = require('fs')
const mimi = require('mime')
const socketIoClient = require('socket.io-client')
const opener = require('opener')
const nodeNotifier = require('node-notifier')
const path = require('path')
const chalk = require('chalk')
const globby = require('globby')

/**
 * Watcher class
 */
class Watcher {
    constructor(_config) {
        this.config = _config
        this.path = process.cwd()

        this.setExcludeRegex()
        this.setSocket()
        this.watch()
    }

    /**
     * Set exclude regex
     * Because chakodar doen't support dot files with glob pattern
     */
    setExcludeRegex() {
        // Exclude files regex
        const regex = []
        const Minimatch = require('minimatch').Minimatch

        for (const _exculdeKey in this.config.exclude) {
            const _exclude = this.config.ex[_exculdeKey]
            const minimatch = new Minimatch(_exclude, { dot: true })

            let regex = ''
        }
    }
}