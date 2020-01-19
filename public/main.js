//1. CSS
getCSS.onclick = () => {
  let request = new XMLHttpRequest()
  request.open("GET",'/style.css')
  request.onreadystatechange = ()=>{
    // console.log(`readyState:${request.readyState}`)
    // console.log(request)
    if(request.readyState === XMLHttpRequest.DONE && request.status >= 200 && request.status < 400){
      // console.log(request.response)
      let style = document.createElement('style')
      style.innerHTML = request.response;
      document.head.appendChild(style)
    }
  }
  request.send()
}

//2. JS
getJS.onclick = ()=>{
  let request = new XMLHttpRequest()
  request.open("GET",'/2.js')
  request.onreadystatechange = ()=>{
    if(request.readyState === XMLHttpRequest.DONE && request.status >= 200 && request.status < 400){
      // console.log(request.response)
      let script = document.createElement("script")
      script.innerText = request.response
      document.body.appendChild(script)
    }
  }
  request.send()
}

//3. HTML
getHTML.onclick = ()=>{
  let request = new XMLHttpRequest()
  request.open('GET','/3.html')
  request.onreadystatechange = ()=>{
    if(request.readyState === XMLHttpRequest.DONE && request.status >= 200 && request.status < 400){
      let div = document.createElement("div")
      div.innerHTML = request.response
      document.body.appendChild(div.firstChild)
    }
  }
  request.send()
}

//4. XML
getXML.onclick = ()=>{
  let request = new XMLHttpRequest()
  request.open('GET','/4.xml')
  request.onreadystatechange = ()=>{
    if(request.readyState == XMLHttpRequest.DONE && request.status >= 200 && request.status < 400){
      console.log(request.responseXML)
      console.log(request.responseXML.getElementsByTagName("warning")[0].innerHTML.trim())
    }
  }
  request.send()
}

//5. JSON
getJSON.onclick = ()=>{
  let request = new XMLHttpRequest()
  request.open('GET','/5.json')
  request.onreadystatechange = ()=>{
    if(request.readyState == XMLHttpRequest.DONE && request.status >= 200 && request.status < 400){
      // let obj = JSON.parse(request.response)
      console.log(request.response)
      console.log(typeof request.response)
      console.log(JSON.parse(request.response))
      console.log(typeof JSON.parse(request.response))
    }
  }
  request.send()
}

//6. pages
let numOfPages = 3 //can be requested from server
let ol = document.createElement("ol")
for(i=0; i<numOfPages; i++){
  let li = document.createElement('li')
  li.id = String(i+1)
  li.innerText = i
  li.onclick = ()=>{
    let request = new XMLHttpRequest()
    request.open("GET",`/page${li.id}`)
    request.onreadystatechange = ()=>{
      if(request.readyState == XMLHttpRequest.DONE && request.status >= 200 && request.status < 400){
        let numOfPages = Array.from(ol.children)
        numOfPages.forEach((item)=>{item.style="color:blue;cursor:grab;"})
        li.style = "color:black; cursor:default"
        const array = JSON.parse(request.response)
        const result = array.map(item=>`<li>${item.id}</li>`).join('')
        document.querySelector("div").innerHTML = `<ul>${result}</ul>`
      }
    }
    request.send()
  }
  ol.appendChild(li)
}
pageNumber.appendChild(ol)

getPage.onclick = ()=>{
  alert("请点击页面下方页码")
}