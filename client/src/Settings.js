function Settings ({ user, setUser, numGames, numWins, avatarList }) {
    const IMG_SIZE = "80"

    function handleDelete(e) {
        return
    }

    function changeAvatar(avatar) {
        fetch(`/users/${user.id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({avatar_id: avatar.id})
        })
        .then(res => {
            if(res.ok) {
                res.json().then((updatedUser) => {
                    setUser(updatedUser)
                });
            }
        })
    }

    return(
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    {/* <p>Total games completed: {numGames}</p>
                    <p>Total games won: {numWins}</p> */}
                    <h4>Your Profile Picture</h4>
                    {avatarList.map((avatar) => (
                        <t>
                            <img id={avatar.id === user.avatar.id ? "my-avatar" : "other-avatar"} src={avatar.image} width={IMG_SIZE} onClick={() => changeAvatar(avatar)} />
                            &emsp;
                        </t>
                    ))}
                    <p></p>
                    <div style={{textAlign: "center"}}>
                        <button className="custom-btn btn-2" onClick={handleDelete}>Delete My Account</button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Settings