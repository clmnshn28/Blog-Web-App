import e from "express";
import bodyParser from "body-parser";

const app = e();
const port = 3000;
app.use(e.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let posts=[];

app.get("/", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/create", (req, res)=>{
    res.render("create.ejs");
})

app.post("/create", (req, res)=>{
    console.log(req.body)
    const {title, content, author} = req.body;
    posts.unshift({
        id: posts.length + 1, 
        title, 
        content, 
        author,
        createdAt: new Date().toLocaleDateString("en-US",{
            month: "short",
            day: "numeric",
            year: "numeric",
        }),
    })
    res.redirect("/");
})

app.get("/view/:id",(req, res)=>{
    const post = posts.find(p=> p.id === Number(req.params.id));
    res.render("view.ejs", {post});
})

app.get("/edit/:id", (req, res)=>{
    const post = posts.find(p => p.id === Number(req.params.id));
    console.log(post)
    res.render("edit.ejs", {post});
})

app.post("/edit/:id", (req, res)=>{
    const post = posts.find(p => p.id === Number(req.params.id));
    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
    res.redirect("/");
})  

app.post("/delete/:id", (req, res)=>{
    posts = posts.filter(p=> p.id !== Number(req.params.id));
    res.redirect('/');
})


app.listen(port, ()=>{
    console.log(`The server is running on port: ${port}`);
})
