import React,{useEffect} from "react";
const CustomizeTheme = ({setcustomizeTheme,user}) => {
useEffect(() => {
    var root = document.querySelector(":root")
    var colorPallete = document.querySelectorAll(".choose-color span")
    var font_Size = document.querySelectorAll(".choose-size span")
    var custome_theme = document.querySelector(".customize-theme")
    var Bg1 = document.querySelector(".bg-1")
    var Bg2 = document.querySelector(".bg-2")
    var Bg3 = document.querySelector(".bg-3")

    var colorModel = JSON.parse(localStorage.getItem(`${user._id}`))
    var primaryHue;
    var font_size;
    //changing background color
    var lightcolorlightness;
    var darkcolorlightness;
    var whitecolorlightness;
    var colornamelightness;
        custome_theme.addEventListener("click",(e)=>{
      if(e.target.classList.contains("customize-theme")){
        setcustomizeTheme(false)  
        // window.location.reload(false)
        
      }
    })



//changing fontisizes
        const ChangeActiveItem = () => {
      font_Size.forEach((item) => {
        item.classList.remove("active");
      });
    };
         const ChangeActiveItemcolor = () => {
      colorPallete.forEach((color) => {
        color.classList.remove("active");
      });
    };
//=====================
    font_Size.forEach((item)=>{
      item.addEventListener("click",()=>{
        ChangeActiveItem()
        item.classList.add("active")
        if(item.classList.contains("font-size-1")){
           font_size = "10px"
           root.style.setProperty("--stick-top-left","5.4rem")
           root.style.setProperty("--stick-top-right","5.4rem")
           localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            font_size
           }))

        }
        if(item.classList.contains("font-size-2")){
           font_size = "13px"
           root.style.setProperty("--stick-top-left","5.4rem")
           root.style.setProperty("--stick-top-right","-7rem")
           localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            font_size
           }))
        }
        if(item.classList.contains("font-size-3")){
           font_size = "16px"
           root.style.setProperty("--stick-top-left","5.4rem")
           root.style.setProperty("--stick-top-right","-10rem")
            localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            font_size
           }))
        }
        if(item.classList.contains("font-size-4")){
           font_size = "19px"
           root.style.setProperty("--stick-top-left","-5rem")
           root.style.setProperty("--stick-top-right","-25rem")
            localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            font_size
           }))
        }
        if(item.classList.contains("font-size-5")){
           font_size = "22px"
           root.style.setProperty("--stick-top-left","-10rem")
           root.style.setProperty("--stick-top-right","-30rem")
            localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            font_size
           }))
        }
       document.querySelector("html").style.fontSize=font_size;
      })
    })

//chagingig color
colorPallete.forEach((color)=>{
  color.addEventListener(("click"),()=>{
    
   ChangeActiveItemcolor()
    color.classList.add("active")
    if(color.classList.contains("color-1")){
      primaryHue = 252;
          localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            primaryHue
           }))
           
        }
        if(color.classList.contains("color-2")){
          primaryHue = 52;
          localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            primaryHue
           }))
        }
        if(color.classList.contains("color-3")){
             primaryHue = 352;
              localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            primaryHue
           }))
        }
        if(color.classList.contains("color-4")){
         primaryHue = 152;
          localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            primaryHue
           }))
        }
        if(color.classList.contains("color-5")){
          primaryHue = 202;
           localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            primaryHue
           }))
        }
      root.style.setProperty("--color-primary-hue",primaryHue)
  })
})



function ChangeBg(){
 root.style.setProperty("--light-color-lightness",lightcolorlightness)
 root.style.setProperty("--white-color-lightness",whitecolorlightness)
 root.style.setProperty("--dark-color-lightness",darkcolorlightness) 
 root.style.setProperty("--color-name-lightness",colornamelightness) 
 var colorModel = JSON.parse(localStorage.getItem(`${user._id}`))
  localStorage.setItem(`${user._id}`,JSON.stringify({...colorModel,
            lightcolorlightness,
            whitecolorlightness,
            darkcolorlightness,
            colornamelightness
           }))
}

Bg1.addEventListener("click",()=>{
darkcolorlightness="17%";
  whitecolorlightness="100%";
  lightcolorlightness="95%";
  colornamelightness="0%"

  Bg1.classList.add("active")
  Bg2.classList.remove("active")
  Bg3.classList.remove("active")
ChangeBg()
})

Bg2.addEventListener("click",()=>{
  darkcolorlightness="95%";
  whitecolorlightness="20%";
  lightcolorlightness="15%";
  colornamelightness="80%"

  Bg2.classList.add("active")
  Bg1.classList.remove("active")
  Bg3.classList.remove("active")
  ChangeBg();
})

Bg3.addEventListener("click",()=>{
  darkcolorlightness="0%";
  whitecolorlightness="10%";
  lightcolorlightness="0%";
  colornamelightness="100%"

  Bg3.classList.add("active")
  Bg1.classList.remove("active")
  Bg2.classList.remove("active")
  ChangeBg();
})




//returning the latast selected value
      const latestValue = ()=>{
        font_Size.forEach((item)=>{
          if(document.querySelector("html").style.fontSize === "10px" ){
             if(item.classList.contains("font-size-1")){
              item.classList.add("active")
            }
          }
          if(document.querySelector("html").style.fontSize === "13px" ){
             if(item.classList.contains("font-size-2")){
              item.classList.add("active")
            }
          }
          if(document.querySelector("html").style.fontSize === "16px" ){
             if(item.classList.contains("font-size-3")){
              item.classList.add("active")
            }
          }
          if(document.querySelector("html").style.fontSize === "19px" ){
             if(item.classList.contains("font-size-4")){
              item.classList.add("active")
            }
          }
          if(document.querySelector("html").style.fontSize === "22px" ){
             if(item.classList.contains("font-size-5")){
              item.classList.add("active")
            }
          }
        })
    }
  latestValue()
})
//storing setting color to localstorega

  return (
    <div>
      <div className="customize-theme">
        <div className="card">
          <h2 className="custom">Customize your view</h2>
          <p className="text-muted">
            Manage your color,backaground and font size
          </p>

          <div className="font-size">
            <h4 className="custom">Font Size</h4>
            <div>
              <h6 className="custom">Aa</h6>
              <div className="choose-size">
                <span className="font-size-1"></span>
                <span className="font-size-2 "></span>
                <span className="font-size-3"></span>
                <span className="font-size-4"></span>
                <span className="font-size-5"></span>
              </div>
              <h3 className="custom">Aa</h3>
            </div>
          </div>

          <div className="color">
            <h4 className="custom">Color</h4>
            <div className="choose-color">
              <span className="color-1 active"></span>
              <span className="color-2"></span>
              <span className="color-3"></span>
              <span className="color-4"></span>
              <span className="color-5"></span>
            </div>
          </div>

          <div className="background">
            <h4 className="custom">backaground</h4>
            <div className="choose-bg">
              <div className="bg-1 active">
                <span></span>
                <h5 htmlFor="bg-1">Light </h5>
              </div>
              <div className="bg-2">
                <span></span>
                <h5 htmlFor="bg-2">Dim</h5>
              </div>
              <div className="bg-3">
                <span></span>
                <h5 htmlFor="bg-3">Lights out</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTheme;
