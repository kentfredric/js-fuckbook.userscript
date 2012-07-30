/* vim: set sw=2 ts=2 et: */
Queue = function(name) {
  var qname = name;
	var items = [];
	var pos   = 0;
	var stash = { };
	stash.addItem = function( name , fn ){ 
		items.push({
			name : name,
			fn : fn,
		});
	};
	stash.run_current = function(){
		if ( typeof item[pos] == 'undefined' ){ 
			return;
		}
		items[ pos ].fn();
	};
	stash.next = function() {
		pos = pos + 1;
	};
	stash.dequeue = function(){
		if ( typeof items[pos] == 'undefined' ){ 
			return;
		}
		var fn = items[ pos ].fn;
		ctx.syslog(qname + ':dequeue ' + items[pos].name );
		pos = pos + 1;
		fn();
	};
	stash.add_repeater = function( name, test, success ) {
		var cb_code = function() {
			if ( test() ){
				success();
			} else {
				setTimeout( cb_code , 10 );
			}
		};
		stash.addItem( name , cb_code );
	};
	stash.add_wait = function( name, test ){ 
		stash.add_repeater( name, test, function(){ 
			stash.dequeue();
		});
	};
  stash.add_event = function( name, code ){ 
    stash.addItem(name, function(){
      code(stash);
      stash.dequeue();
    });
  };
  stash.abort = function(){
    ctx.syslog(qname + ':manual abort');
    pos = items.length + 1;
  };
	return stash;
};


