import { belongsTo, createServer, hasMany, Model } from "miragejs"

export const createMockServer=()=>{
    createServer({
        models: {
            user: Model.extend({
                like: hasMany(),
                comment: hasMany(),
                post:hasMany(),
            }),
            post: Model.extend({
                user:belongsTo(),
                like: hasMany(),
                comment: hasMany()
            }),
            like: Model.extend({
                post: belongsTo(),
                user: belongsTo(),
            }),
            comment: Model.extend({
                post: belongsTo(),
                user: belongsTo(),
            }),
        },

        seeds(server) {
            let user_harsh = server.create('user',{userName:"Harsh_Khanna_14",email:"harsh@gmail.com",password:"harsh",address:"Delhi", role:"admin"});
            let user_ramesh = server.create('user',{userName:"Ramesh_Kumar_12",email:"ramesh@gmail.com",password:"ramesh",address:"rajasthan",role:"user"});
            let user_aasha = server.create("user",{userName:"Aasha_12",email:"aasha@gmail.com",password:"aasha",address:"punjab",role:"user"});


            let post_ml = server.create("post",{user:user_harsh,title:"Machine Learning is Fun",description:"Machine Learning is Fun is a valuable, introductory blog. It covers the tenets of ML through interactive tutorials and practical examples, which make it easier to see the useful applications to different businesses and industries. Author Adam Geitgey is a former software developer who now consults organizations on implementing machine learning. He believes ML is integral to the future of software and that developers should have a strong working knowledge, so he provides guides and techniques to help them develop and grow.",
                imageUrl:"https://dataphoenix.info/content/images/2022/01/data_phoenix_article_2-min.png",

            })
            let post_aws = server.create("post",{user:user_harsh,title:"AWS Machine Learning Blog",description:"Amazon is heavily involved in ML, using algorithms in nearly all areas of its business to create leads. Algorithms suggest relevant products for customers in search results, recommend products based on recent purchases, and optimize faster product distribution and shipping from warehouses to customers. The blog features projects and guides that reveal industry strides to readers and covers ML uses in Amazon Web Services technology.",
                imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRHsdzT-cqEE7bKMVSXPqA6PYUr0mP2B9N4uEExDAuvAH3tNeywyENmvdB6A-LYO-stO0&usqp=CAU",
                
            })
            let post_google = server.create("post",{user:user_harsh,title:"AI at Google",description:"Google helped revolutionize machine learning, so to see their level of ML research isn’t surprising. Machine learning and AI critically support how Google technology works—from their search algorithms that redefined web searches, to Google Maps influencing how we navigate destinations, and now their self-driving car is changing the auto industry. Google makes its work available through post discussing their published research and how its technology is used by others to influence AI innovation.",
                imageUrl:"https://cloudfront-us-east-2.images.arcpublishing.com/reuters/I3WWQHWNQVMJRMAD6E5N6O3YJE.jpg",
                
            })
            let post_apple = server.create("post",{user:user_harsh,title:"Apple Machine Learning Journal",description:"Apple’s advancements in voice recognition, predictive text, and autocorrect leveraged for Siri signal some of its machine learning work. And their newest iPhone features ML predominantly in its processor, performing trillions of operations per second; it’s ML in your hands. Apple Machine Learning Journal is a helpful look at how ML shapes their different technologies, and Apple engineers give perspective on how their work influences the transformation of ML.",
                imageUrl:"https://mlr.cdn-apple.com/media/Home_1200x630_48225d82e9.png",
                
            })
            let post_fastml = server.create("post",{user:user_harsh,title:"FastML",description:"FastML tackles interesting topics in machine learning with entertaining, easy to consume post. It’s run by economist Zygmunt Zając, and is a go-to ML platform, tackling topics like overfitting, pointer networks, and chatbots, among others. If you’re frustrated by some of the existing ML papers that feel like you need a PhD in math to understand them, bookmark this blog.",
                imageUrl:"https://www.aurogroup.ac/hubfs/fast%20ml%20featured%20image.png",
                
            })
            let post_OpenAI = server.create("post",{user:user_harsh,title:"OpenAI",description:"OpenAI comes from industry experts who want to bring AI to the masses. It's linked to the non-profit research company OpenAI, co-chaired by Elon Musk and Sam Altman, and sponsored by companies such as Amazon Web Services, Microsoft, and Infosys who are trying to make AI accessible—hence the name. Contributors discuss their collective efforts to promote and advance AI technologies through long-term research. It’s a valuable resource for anyone interested in the future of AI.",
                imageUrl:"https://myexeed.com/wp-content/uploads/2023/10/11.webp",
                
            })

            server.create("like",{user:user_ramesh,post:post_aws});
            server.create("like",{user:user_aasha,post:post_fastml});
            server.create("like",{user:user_ramesh,post:post_OpenAI});
            server.create("like",{user:user_aasha,post:post_ml});
            server.create("like",{user:user_aasha,post:post_apple});
            server.create("like",{user:user_ramesh,post:post_google});
        },

        routes() {
            this.get("/api/users", (schema) => {
                return schema.user.all();
            })
            this.post("/api/user",(schema,request)=>{
                let attrs = JSON.parse(request.requestBody);
                console.log(attrs);
                return schema.user.create(attrs);
            })
            this.get("/api/posts",(schema)=>{
                return schema.post.all();
            })
        },
    })
}