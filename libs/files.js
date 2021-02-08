const diff = require('diff')
const ids = require('./ids')

class File {
    constructor(_options) {
        this.id = ids.getId();
        this.name = _options.name
        this.path = {}
        this.path.directory = _options.path
        this.path.full = this.path.directory + '/' + this.name
        this.versions = []
        this.projectSocket = _options.projectSocket

        const nameParts = this.name.split('.')

        if (nameParts.length > 1) {
            this.extension = nameParts[nameParts.length - 1]
        }
        else {
            this.extension = ''
        }

        // Create first version
        if (typeof _options.content !== 'undefined') {
            this.createVersion(_options.content)
        }
    }

    createVersion(content) {
        const version = {}
        const lastVersion = this.getLastVersion()

        if (!lastVersion) {
            version.addedLines = []
            version.removedLines = []
        } else if (version.content === '') {
            version.addedLines = []
            version.removedLines = []

            // Don't save if last version had no content too
            if (lastVersion.content === '') {
                return false
            }
        }
        else {
            const differences = diff.diffLines(
                lastVersion.content,
                version.content,
                {
                    // ignoreWhitespace: true
                }
            )

            // Set added lines
            version.addedLines = [];


            let lineProgress = 0;

            // Added lines and unchanged lines
            for (const differenceKey in differences) {
                const difference = differences[differenceKey]
                let lineBreaks = (difference.value.match(/\n/g) || []).length

                if (parseInt(differenceKey) === differences.length - 1) {
                    lineBreaks += 1
                }

                if (difference.added) {
                    for (let i = 0; i < lineBreaks; i++) {
                        version.addedLines.push(lineProgress + i)
                    }
                }

                if (!difference.removed) {
                    lineProgress += lineBreaks
                }

                // Set removed lines
                version.removedLines = []

                lineProgress = 0

                // remove lines
                for(const difference )
            }

        }
        // Content
    }

    getLastVersion() {
        if (this.versions.length === 0) {
            return false
        }

        return this.versions[this.versions.length - 1]
    }

    describe() {
        // Set up
        const result = {}

        result.id = this.id
        result.name = this.name
        result.path = this.path
        result.versions = this.versions
        result.extension = this.extension

        return result
    }

    destructor() {

    }
}

module.exports = File