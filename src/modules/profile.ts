import { saveProfileText, getProfileText, deleteUser } from './fetchdata';
import {getLoggedInUser} from "./login.ts";
import {getCommentsByUserId} from "./displayForum.ts";

export function profileSite() {
    const changeProfileTextButton = document.getElementById('changeProfileText') as HTMLElement;
    const pElement = document.getElementById('profilText') as HTMLElement;
    const ptext = document.getElementById('ptext') as HTMLFormElement;
    const writeProfilText = document.getElementById('writeProfilText') as HTMLInputElement;
    const proSite = document.getElementById('proSite') as HTMLElement;
    const postsContainer = document.getElementById('postsContainer') as HTMLElement;
    const deleteProfile = document.getElementById('deleteProfile') as HTMLButtonElement;


    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        const userDel = loggedInUser.id;
        deleteProfile.addEventListener('click', () => {
        deleteUser(userDel);
        alert('Profile deleted!')
        });
    } else {
        console.error('Deletion failed');
    }

    async function loadProfileText() {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
            const userId = loggedInUser.userName;
            const profileText = await getProfileText(userId);
            if (profileText !== null) {
                pElement.innerText = profileText;
            } else {
                pElement.innerText = "No profile text available";
            }
        } else {
            console.error('No logged in user found.');
        }
      }
      
    
    async function loadPostHistory() {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
            const userId = loggedInUser.id;
            const postHistory = await getCommentsByUserId(userId);
            renderPostHistory(postHistory);
        } else {
            console.error('No logged in user found.');
        }
    }

    function renderPostHistory(postHistory) {
        postsContainer.innerHTML = '';
        
        postHistory.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('comment-wrapper');
            
            const usernameEl = document.createElement('h3');
            usernameEl.textContent = post.userName;
            
            const titleEl = document.createElement('h2');
            titleEl.textContent = post.title;
            
            const messageEl = document.createElement('p');
            messageEl.textContent = post.message;
            
            postDiv.appendChild(usernameEl);
            postDiv.appendChild(titleEl);
            postDiv.appendChild(messageEl);
            
            postsContainer.appendChild(postDiv);
        });
    }
    
    
    loadProfileText();
    loadPostHistory();

    changeProfileTextButton.addEventListener('click', () => {
        ptext.style.display = 'block';
        changeProfileTextButton.style.display = 'none';
        pElement.innerText = '';
    });

    ptext.addEventListener('submit', async (event: Event) => {
        event.preventDefault();
        ptext.style.display = 'none';
        changeProfileTextButton.style.display = 'block';

        const newProfileText = writeProfilText.value;

       
        await saveProfileText(newProfileText);

        pElement.innerText = newProfileText;
    });
    proSite.style.display = 'block';

    const forum1 = document.getElementById('forum1') as HTMLButtonElement;
    const forum2 = document.getElementById('forum2') as HTMLButtonElement;
    const forum3 = document.getElementById('forum3') as HTMLButtonElement;
    const members = document.getElementById('members') as HTMLButtonElement;

function profileOff (forum: HTMLButtonElement) {
    forum.addEventListener('click', ()=>{
        proSite.style.display = 'none';
    })
}
profileOff(forum1);
profileOff(forum2);
profileOff(forum3);
profileOff(members);
}



