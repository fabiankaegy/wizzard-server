import chalk from 'chalk';

function code( input: any ) {
	console.log( chalk.cyan( input ) );
};

function error( input: any ) {
	console.log( chalk.bold.red( input ) );
};

function info( input: any ) {
	console.log( input );
};
function success( input: any ) {
	console.log( chalk.bold.green( input ) );
};

const log = {
    code,error,info,success
}

export default log;
