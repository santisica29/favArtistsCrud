const deleteBtn = document.querySelectorAll(".del");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", deleteArtist);
});

async function deleteArtist() {
  const name = this.parentNode.childNodes[1].innerText;
  try {
    const res = await fetch("/deleteArtist", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        artistName: name,
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.error(err);
  }
}
