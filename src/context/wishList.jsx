import { createContext, useContext } from "react";

const wishlist = createContext()

//wishlist provider

export function WishlistProvider({children}) {
    const [wishList, setWishList] = useState([]); //wishlist state
     
    //add to wishlist function
    const addToWishlist = (movie) =>
    {setWishList([...wishList, movie])}

    //remove from wishlist function
    const removeFromWishlist = (movie) => {
        setWishList(wishList.filter((item) => item.id !== movie.id))
    }
    const inWishlist = (movie) => {
        return wishList.some((item) => item.id === movie.id) //-> returns true if the movie is in the wishlist
    }
    return (
        <wishlist.Provider value={[]}>
            {children}
        </wishlist.Provider>
    )
}
export default wishlist
export const useWishlist = useContext(wishlist) //-> returns the three functions in order, هنخزنهم بعدين ع شان نستخدمهم في الكومبوننت اللي هنعملها

