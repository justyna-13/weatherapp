/*Left bar*/
function iconClick(e) {
    if (e.target.getAttribute("id") === "icon"){
            for (i=0; i<6; i++){
            e.target.parentNode.children[i].setAttribute("style", "color: rgba(255, 255, 255, 0.719);");
            }
            e.target.setAttribute("style", "color: rgba(233, 203, 37, 0.76);");
        }
}

document.addEventListener("click", iconClick, false);