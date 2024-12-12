async function getData() {
    try {
        let res = await fetch("./data.json");
        let data = await res.json(); 
        console.log("successful!");
        return data;
    } catch (err) {
        console.log(err);
    }
}
