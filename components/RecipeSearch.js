import React, { useState } from "react";
import { TextInput, View, Button, Image, Text, FlatList, StyleSheet } from "react-native";
import { fetchRecipes } from "./Api";

function RecipeSearch() {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState(['']);

    const handleSearch = () => {
        fetchRecipes(ingredient)
            .then((data) => {
                setRecipes(data.meals || []);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
        };

    const renderRecipe = ({item}) => (
        <View style={styles.recipeContainer}>
            <Image source={{ uri: item.strMealThumb}} style={styles.thumbnail}></Image>
            <Text style={styles.title}>{item.strMeal}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search by ingredient"
                value={ingredient}
                onChangeText={(text) => setIngredient(text)}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.idMeal}
                renderItem={renderRecipe}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                style={styles.list}
                >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    recipeContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    thumbnail: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: 'black'
    }
});
    
export default RecipeSearch;