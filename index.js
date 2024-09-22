let prompt = document.querySelector("#prompt");
let btn = document.querySelector("#btn");
let chatcontainer = document.querySelector(".chat-container");
let usermessage = null;
let Api_url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBhJQxowm81JqdCdTnQN2vC1Hr55bOJTDo";

function createChatBox(html, className) {
  let div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}
async function getApiResponse(Aichatbox) {
  let textelement = Aichatbox.querySelector(".text");
  try {
    let response = await fetch(Api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: usermessage }],
          },
        ],
      }),
    });
    let data = await response.json();
    // console.log(data);
    let apiresponse = data?.candidates[0].content.parts[0].text;
    // console.log(apiresponse);
    textelement.innerText = apiresponse;
  } catch (error) {
    console.log(error);
  }
  finally{
    Aichatbox.querySelector("#loading").style.display="none"

  }
}
function showloading() {
  let html = `     <div class="img">
                <img src="ai.png" alt="" width="50">
            </div>
            <p class="text"></p>
            <img src="loading.gif" id="loading" alt="loading" height="50">`;
  let Aichatbox = createChatBox(html, "ai-chat-box");
  chatcontainer.appendChild(Aichatbox);
  getApiResponse(Aichatbox);
}
btn.addEventListener("click", () => {
  usermessage = prompt.value;
  if (!usermessage) return;
  let html = ` <div class="img">
                <img src="avatar.png" alt="" width="50">
               </div>
               <p class="text"></p>`;
  let userchatbox = createChatBox(html, "user-chat-box");
  userchatbox.querySelector(".text").innerText = usermessage;
  chatcontainer.appendChild(userchatbox);
  prompt.value = "";
  setTimeout(showloading, 2000);
});
