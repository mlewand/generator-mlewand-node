'use strict';

const Generator = require( 'yeoman-generator' );

module.exports = class extends Generator {
	constructor( args, opts ) {
		super( args, opts );

		this.option( 'vscodeDebug', {
			description: 'Whether vscode debugging config should be added.',
			type: Boolean,
			default: true
		} );
	}

	writing() {
		if ( this.options.vscodeDebug ) {
			this.fs.copy(
				this.templatePath( '.vscode/launch.json' ),
				this.destinationPath( '.vscode/launch.json' )
			);
		}
	}
};