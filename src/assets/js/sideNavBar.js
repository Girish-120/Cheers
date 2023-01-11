function openNav() {
    document.getElementById("mySidenav").style.width = "600px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  function openNavItem() {
    console.log(document.getElementById("openNav").value);
    document.getElementById("mySidenavItem").style.width = "1200px";
  }
  
  function closeNavItem() {
    document.getElementById("mySidenavItem").style.width = "0";
  }