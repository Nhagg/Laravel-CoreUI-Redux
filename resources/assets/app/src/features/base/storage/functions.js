




const mStorage = localStorage;

export function setItem(key,value){
    mStorage.setItem(key, value );
}

export function getItem(key, def) {
    var val = mStorage.getItem(key);
    if( val===null ){
        return def;
    }
    return val;
}

export function removeItem(key){
    mStorage.removeItem( key );
}

export function clear(){
    mStorage.clear();
}
