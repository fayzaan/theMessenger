class Messenger {
    constructor ( source, receiveListener, origin, targetOrigin ) {
        this.source = source;
        this.listener = false;
        this.origin = origin || '*';
        this.targetOrigin = targetOrigin || '*';

        if ( this.source && this.source.addEventListener ) {
            try {
                if ( receiveListener ) {
                    this.listener = receiveListener;
                }

                this.receive = ( e ) => {
                    if ( this.origin !== '*' ) {
                        if ( this.origin !== e.origin ) {
                            return;
                        }
                    }

                    if ( this.listener ) { this.listener( e.data ); }
                };

                this.source.addEventListener( 'message', this.receive, false );
            } catch ( e ) {
                throw new Error( 'Unsupported source' );
            }

        } else {
            throw new Error( 'Unsupported source' );
        }
    }
    send ( target, message ) {
        if ( !message ) {
            throw new Error( 'Send failed, message not defined' );
        }

        if ( target && target.postMessage ) {
            try {
                target.postMessage( message, this.targetOrigin );
            } catch ( e ) {
                throw new Error( 'Send failed. ', e );
            }
        } else {
            throw new Error( 'Send failed, unsupported target' );
        }
    }
    destruct () {
        this.source.removeEventListener( 'message', this.receive, false );
        this.source = null;
        this.listener = null;
        this.origin = null;
        this.targetOrigin = null;
    }
}

module.exports = Messenger;