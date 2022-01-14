/* API Key- lWfMNh9HcA4hcZnx7OBryAelR5Rho6dYA4hhovOw
https://api.nasa.gov/planetary/apod?api_key=lWfMNh9HcA4hcZnx7OBryAelR5Rho6dYA4hhovOw*/
function load_page(data,type){
    if(type=='rover'){
        let likes = localStorage.getItem('likes')
        if(likes!=null){
            likes = likes.split(',')
        }
        for(var i in data.photos){
            let camera_name = data.photos[i].camera.full_name
            let image_src = data.photos[i].img_src
            let date = data.photos[i].earth_date
            let rover = data.photos[i].rover.name
            let post_id = data.photos[i].id
            let postbox=document.createElement('div')
            postbox.setAttribute('class','col p-2')
            let post = document.createElement('div')
            post.setAttribute('class','border border-3 rounded rounded-3 p-2 post')
            let imgbox = document.createElement('div')
            imgbox.className = 'imgbox'
            let img = document.createElement('img')
            img.setAttribute('class','img-fluid rounded')
            img.src=image_src
            let heading=document.createElement('h4')
            heading.innerText=rover
            
            let heading2=document.createElement('h5')
            heading2.innerText=camera_name
            let date_ = document.createElement('span')
            date_.setAttribute('class','text-muted col-12')
            date_.innerText=date
            let like = document.createElement('div')
            like.setAttribute('class','fs-2 like rounded')
            like.setAttribute('id',post_id)
            like.innerHTML='<i class="bi bi-heart"></i>'
            let loading = document.createElement('div')
            loading.setAttribute('class','loading rounded')
            loading.innerText = 'Loading'
            loading.innerHTML = '<span></span><span></span>'
            img.onload = ()=>{
                loading.classList.add('d-none')
            }
            if(likes!=null){
                if(likes.includes(`${post_id}`)){
                    like.innerHTML='<i class="bi bi-heart-fill"></i>'
                }
            }
            like.addEventListener('click',event=>{
                if(like.innerHTML=='<i class="bi bi-heart"></i>'){
                    like.innerHTML = '<i class="bi bi-heart-fill"></i>'
                    if(localStorage.getItem('likes')!=null){
                        localStorage.setItem('likes',localStorage.getItem('likes')+','+post_id)
                    }else{
                        localStorage.setItem('likes',post_id)
                    }
                    
                    console.log(localStorage.getItem('likes'))
                }else{
                    like.innerHTML='<i class="bi bi-heart"></i>'
                    let likes = localStorage.getItem('likes')
                    likes = likes.split(',')
                    const index = likes.indexOf(String(post_id));
                    if (index > -1) {
                        likes.splice(index, 1);
                    }
                    localStorage.setItem('likes',likes.join(','))
                    console.log(likes,post_id)
    
                }
            })
            post.appendChild(heading)
            post.appendChild(heading2)
            post.appendChild(date_)
            imgbox.appendChild(img)
            imgbox.appendChild(like)
            imgbox.appendChild(loading)
            post.appendChild(imgbox)
            postbox.appendChild(post)
            document.getElementById('main').appendChild(postbox)
            break
           }
    }else if(type=='astro'){
        let copyright = data.copyright
        let img_date = data.date
        let para = data.explanation
        let title = data.title
        let url = data.url
        let hdurl = data.hdurl
        
        let astro_box = document.createElement('div')
        astro_box.setAttribute('class','astrobox col-12 col-sm-10 d-flex justify-content-center flex-column align-items-center')
        let imgbox = document.createElement('div')
        imgbox.setAttribute('class','apod-img-box d-flex justify-content-center align-items-center flex-column col-12 col-sm-10 col-lg-8 m-2')
        let img = document.createElement('img')
        img.setAttribute('class','img-fluid rounded')
        img.src = url
        let title_ = document.createElement('h5')
        title_.innerHTML = title
        title_.setAttribute('class','text-center')
        let explanation = document.createElement('p')
        explanation.setAttribute('class','text-center para p-2 rounded')
        explanation.innerText = para
        let loading = document.createElement('div')
        loading.setAttribute('class','loading rounded')
        loading.innerText = 'Loading'
        loading.innerHTML = '<span></span><span></span>'
        img.onload = ()=>{
            loading.classList.add('d-none')
        }
        imgbox.appendChild(img)
        imgbox.appendChild(explanation)
        imgbox.appendChild(loading)
        astro_box.appendChild(imgbox)
        astro_box.appendChild(title_)
        document.getElementById('astro_img_of_the_day').appendChild(astro_box)

    }
}






let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


let cameralist = ['fhaz','pancam','minites','navcam']
let rovers = ['curiosity','opportunity','spirit']
for(var k in rovers){
    for(var j in cameralist){
        let link = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[k]}/photos?sol=100&camera=${cameralist[j]}&page=1&api_key=lWfMNh9HcA4hcZnx7OBryAelR5Rho6dYA4hhovOw`
        //console.log(rovers[k],cameralist[j])
        fetch(link)
        .then(response => response.json())
        .then(data => load_page(data,'rover'))
        .catch(err => console.error(err));
    }
}
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
fetch(`https://api.nasa.gov/planetary/apod?date=${today}&api_key=lWfMNh9HcA4hcZnx7OBryAelR5Rho6dYA4hhovOw`)
        .then(response => response.json())
        .then(data => load_page(data,'astro'))
        .catch(err => console.error(err));

window.onload =()=>{
    document.getElementsByClassName('loading')[0].classList.add('d-none')
}

console.log()