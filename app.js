const url = "https://api.github.com/users"

const searchInputEl = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
   return `<div class="profileBox">
            <div class="topSec">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="avatar">
                    </div>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <p>${profile.login}</p>
                    </div>
                </div>
                <a href = "${profile.html_url}">
                <button class="primaryBtn">Check Profile</button>
                 </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Followings</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        </div>`
}





const fetchProfile = async () => {

    const userName  = searchInputEl.value;
    loadingEl.innerText = "loading...."
    loadingEl.style.color = "black"

    try{
        const res =  await fetch(`${url}/${userName}`);
        const data = await res.json();
        // console.log("data",data);

        if(data.bio){   
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data)
        }else{
            loadingEl.innerHTML = data.message;            
            loadingEl.style.color = "red"
            profileContainerEl.innerText = ""
        }
        
    }catch(e){
        console.log( "error is: " , e);
        loadingEl.innerText = "";
    }
}
searchButton.addEventListener("click",fetchProfile);