export function addClass(id, classes) {
    if (Array.isArray(classes)) {
        classes.forEach(cls => {
            document.getElementById(id).classList.add(cls);
        });
    } else {
        document.getElementById(id).classList.add(classes);
    }
}

export function removeClass(id, classes) {
    if (Array.isArray(classes)) {
        classes.forEach(cls => {
            document.getElementById(id).classList.remove(cls);
        });
    } else {
        document.getElementById(id).classList.remove(classes);
    }
}

export function getValue(id) {
    return document.getElementById(id).value;
}

export function setValue(id, value) {
    document.getElementById(id).value = value;
}

export function clearValue(id) {
    document.getElementById(id).value = '';
}

export function openModal(id) {
    document.getElementById(id).showModal();
}

export function closeModal(id) {
    document.getElementById(id).close();
}