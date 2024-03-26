import { useEffect, useState } from "react";
import "./InsertNewRecipe.scss";
import "./IndianCusine";
export default function InsertNewRecipe() {
    const [data, setData] = useState([]);
    // add categories state
    const [categories, setCategories] = useState([]);
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        cooking_time: '',
        preparation_time: '',
        instruction: '',
        difficulty_level: '',
        image: '',
        category_id: ''
    });

    const handleRecipeChange = (event) => {

        setRecipe(previous_recipe => {
            return ({
                ...previous_recipe,
                [event.target.name]: event.target.value
            });
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('/api/recipe/add', recipe)

            alert('A recipe was submitted');
        } catch (error) {
            console.log(error)
        }
    };
    // fetch categories function
    const getCategories = async () => {
        const response = await fetch("/api/recipe/categories");
        const data = await response.json();
        console.log(data);
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    // this function added to use effect


    return (
        <div className="Insert-container">
            <div className="main-heading">
                <h1>Add a Recipe</h1> </div>
            <div className="image-container">
                <img
                    className="category-image"
                    src="https://marketplace.canva.com/NqqlA/MAFmARNqqlA/1/s2/canva-indian-food-MAFmARNqqlA.jpg"
                    alt=""
                />
            </div>
            <h2 className="container-fieldsList_heading">We are so exited to have your recipe on our website</h2>
            <p> Here is the form that you can use to add your favorite meal. Please fill out all the fields.</p>


            <div className="container-form">
                <form action='' method='post' onSubmit={handleSubmit}>
                    <label className="fields">
                        Title:
                        <input className="fields-to-fill" type="text" name="title" value={recipe.title} onChange={handleRecipeChange} />

                    </label>

                    {/* Select input with options from fetched categories */}

                    <label className="fields">
                        Select a cuisine:
                        <select name="category_id" value={recipe.category_id} onChange={handleRecipeChange}>
                            <option value="">Select</option>
                            {
                                categories.map(category => {
                                    return <option value={category.id}>{category.name}</option>
                                })
                            }
                        </select>
                    </label>


                    <label className="fields">
                        Description:
                        <textarea rows="5" cols="50" className="fields-to-fill" type="text" name="description" value={recipe.description} onChange={handleRecipeChange} />
                    </label>
                    <label className="fields">
                        Cooking time:
                        <input className="fields-to-fill" type="text" name="cooking_time" value={recipe.cooking_time} onChange={handleRecipeChange} />
                    </label>
                    <label className="fields">
                        Preparation time:
                        <input className="fields-to-fill" type="text" name="preparation_time" value={recipe.preparation_time} onChange={handleRecipeChange} />
                    </label>

                    <label className="fields">
                        Instruction:
                        <textarea rows="5" cols="50" className="fields-to-fill" type="text" name="instruction" value={recipe.instruction} onChange={handleRecipeChange} />
                    </label>
                    <label className="fields">
                        Difficulty level:
                        <input className="fields-to-fill" type="text" name="difficulty_level" value={recipe.difficulty_level} onChange={handleRecipeChange} />
                    </label>
                    <label className="fields">
                        Image:
                        <input className="fields-to-fill" type="file" name="image" onChange={handleRecipeChange} />
                    </label>
                    <input className="submit-button" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
