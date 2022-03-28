const geoLetterUniceode = "\u10d0\u10d1\u10d2\u10d3\u10d4\u10d5\u10d6\u10d7\u10d8\u10d9\u10da\u10db\u10dc\u10dd\u10de\u10df\u10e0\u10e1\u10e2\u10e3\u10e4\u10e5\u10e6\u10e7\u10e8\u10e9\u10ea\u10eb\u10ec\u10ed\u10ee\u10ef\u10f0"
const latLetters = "A-Za-z";

const geoRegex = /^[-+., (\u10d0\u10d1\u10d2\u10d3\u10d4\u10d5\u10d6\u10d7\u10d8\u10d9\u10da\u10db\u10dc\u10dd\u10de\u10df\u10e0\u10e1\u10e2\u10e3\u10e4\u10e5\u10e6\u10e7\u10e8\u10e9\u10ea\u10eb\u10ec\u10ed\u10ee\u10ef\u10f0)(0-9)]+$/;
const latRegex = /^[-+., (A-Za-z)(0-9)]+$/;


function letterCheck$(value) {
    return value => {

        if (geoRegex.test(value) && !latRegex.test(value) || !geoRegex.test(value) && latRegex.test(value)) {
            return true
        } else {
            return false
        }
    };
}

function letterCheck$1() {
    return value => {

        if (geoRegex.test(value) && !latRegex.test(value) || !geoRegex.test(value) && latRegex.test(value)) {
            return true
        } else {
            return false
        }
    };
}

export var letterCheck = {
    $validator: letterCheck$1(),
    $message: 'Only one type of characters allowed',
    $params: {
        type: 'letterCheck'
    }
};

export var onlyNumbers = {
    $validator: value => /^[0-9]*$/.test(value),
    $message: 'Only numeric value',
    $params: {
        type: 'onlyNumbers'
    }
};


function strictLength$(length) {
    return value => !(value.toString().length !== length);
}


export function strictLength(length) {
    return {
        $validator: strictLength$(length),
        $message: _ref => {
            let {
                $params
            } = _ref;
            return `This field should be containe ${_ref.$params.length} digit`;
        },
        $params: {
            length,
            type: 'strictLength'
        }
    };
}

function dependOnLetter$(target) {
    return value => {

        if (!target.value.length || !value.length) {
            return true;
        }

        if (geoRegex.test(target.value) && !geoRegex.test(value) || !geoRegex.test(target.value) && geoRegex.test(value)) {
            return false;
        } else {
            return true;
        }

    };
}


export function dependOnLetter(target) {
    return {
        $validator: dependOnLetter$(target),
        $message: _ref => {
            let {
                $params
            } = _ref;
            return `Field must be the same type with relative target`;
        },
        $params: {
            target,
            type: 'dependOnLetter'
        }
    };
}