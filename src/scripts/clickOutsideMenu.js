import closeMenu from "./closeMenu.js";

function clickOutsideMenu(event){
    if (event.target.className == 'list'
        || event.target.parentNode.className == 'list'
        || event.target.parentNode.className == 'list-button'
        || event.target.parentNode.className == 'menu'){
    
    }else{
        event.preventDefault();
        document.removeEventListener('click', clickOutsideMenu);
        closeMenu();
    }
}

export default clickOutsideMenu