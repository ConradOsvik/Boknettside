var loadToast = (txt) => {
    var toast = document.querySelector('#toast')
  
    toast.className = "show";

    toast.innerHTML = `
        <p>${txt}</p>
    `;
  
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 2950);
}