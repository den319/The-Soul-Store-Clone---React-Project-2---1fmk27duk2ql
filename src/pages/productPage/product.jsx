import { Link, useNavigate, useParams } from "react-router-dom"
import useFetchSingleProduct from "../../customHooks/useFetchSingleProduct";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import parse from 'html-react-parser';
import ChevronUp from "../../assets/svg/chevronUp";
import ChevronDown from "../../assets/svg/chevronDown";
import ProductList from "../../components/homePage/productList";
import { findProduct, manageWhishlist } from "../../utils/utilities";
import { UserContext } from "../../context/userContext";






export default function Product() {

    const {productUrl}= useContext(ModalContext);
    const {whishlistItems, setWhishlistItems, setItemsInCart, itemsInCart, token, projectId}= useContext(UserContext);

    const {productId}= useParams();
    const navigate= useNavigate();

    const [product, error]= useFetchSingleProduct(productUrl.getProduct + `${productId}`);
    const [ratings, setRatings]= useState(product?.ratings);

    const [isModalOpen, setIsModalOpen]= useState(false);

    const [isInCart, setIsInCart]= useState(false);
    const [isInWishlist, setIsInWishlist]= useState(false);

    const [isError, setIsError]= useState("");

    const [cart, setCart]= useState({
        quantity: "0",
        size: "",
    })

    // console.log("cart: ", cart);

    function handleChange(event) {
        const target= event.target.value;

        console.log(target);
        setCart((old) => {
            return {
                ...old,
                [target.id]: target.value,
            }
        })
    }

    // console.log("is in wishlist: ", isInWishlist);

    useEffect(() => {
        const isPresentInCart= findProduct(itemsInCart, product?.productId);
        const isPresentInWishlist= findProduct(whishlistItems, product?.productId);

        setIsInCart(isPresentInCart);
        setIsInWishlist(isPresentInWishlist);

        // console.log(isInWishlist)

    }, [whishlistItems, itemsInCart, product])

    useEffect(() => {
        product?.ratings && setRatings(product?.ratings)
    }, [product]);



    function varifyUserForWhishlist() {
        if(token) {
            manageWhishlist(whishlistItems, setWhishlistItems, product, token, projectId);
        } else {
            navigate("/authentication");
        }   
    }

    function varifyUserForCart() {
        if(token) {
            manageWhishlist(whishlistItems, setWhishlistItems, product, token, projectId);
        } else {
            navigate("/authentication");
        }   
    }

    return (
        <div className="w-full flex flex-col justify-center items-center py-[3rem]">
            <div className="w-full xl:max-w-[1500px] flex flex-col justify-between
                px-[1rem] md:flex-row">
                {/* product images */}
                <div className="grid grid-cols-2 grid-rows-2 h-[26rem] gap-[10px] px-[10px]
                    md:h-[30rem] lg:h-[38rem] xl:h-[64rem] xl:gap-[1.5rem]">
                    {
                        product?.images?.map((item, index) => {
                            return (
                                index < 4 &&  
                                    <div key={item} className="w-[10rem] md:w-[12rem]
                                        lg:w-[15rem] xl:w-[25rem]">
                                        <img src={item} alt="No Image" />
                                    </div>
                            )
                        })
                    }
                </div>

                {/* product details */}

                <div className="max-w-[20rem] mt-[1rem] px-[10px] text-[15px] ml-[10px] lg:text-[18px]
                    lg:max-w-[28rem] xl:max-w-[30rem] 2xl:max-w-[35rem] md:mt-0">
                    <div className="pb-[10px] border-b md:pb-[15px]">
                        <p className="text-[25px] font-bold font-grey
                             lg:text-[26px] xl:text-[29px]">{product?.productName}</p>
                        <p className="text-[#a7a9ac]">{product?.subCategory}</p>
                    </div>

                    <div className="py-[10px] md:py-[1rem]">
                        <p className="text-[21px] font-bold font-grey
                             lg:text-[26px] xl:text-[29px]">₹ {product?.price}</p>

                        <p className="font-bold py-[10px]">Please select a size.</p>

                        <div className="flex items-center font-grey py-[10px]">
                            {
                                product?.size?.map(item => {
                                    return (
                                        <button id="size" value={item} key={item} className="flex items-center justify-center w-[3.5rem] h-[3.5rem] p-[1rem] border rounded-full mr-[1rem] cursror-pointer
                                            font-semibold cursor-pointer
                                            hover:border-[#e11b23] hover:bg-[#e11b23] hover:text-white"
                                            onClick={(e) => handleChange(e)}>
                                            {item}
                                        </button>
                                    )
                                })
                            }
                        </div>

                        <div className="flex items-center py-[10px]">
                            <p className="font-bold">Color: </p>
                           
                            <p className={`pl-[7px] font-semibold`}>{product?.color}</p> 
                        </div>

                        <div className="flex items-center py-[10px]">
                            <p className="font-bold">Ratings: </p>
                           <div className="flex items-center">
                                <p className={`pl-[7px] font-semibold ${ratings >= 3.5 ? "font-green" : ratings > 2 ? "text-[#fc8a08]" : "font-red"}`}>
                                    {ratings?.toFixed(1)}
                                </p>

                                <p>/5.0</p> 
                           </div>
                            
                        </div>
                        <div className="flex items-center py-[10px]">
                            <p className="pr-[1rem]">Quantity</p>

                            <select id="quantity" className="border rounded-[5px] p-[5px]"
                                onChange={(e) => handleChange(e)}>
                                <option value="1">01</option>
                                <option value="2">02</option>
                                <option value="3">03</option>
                                <option value="4">04</option>
                                <option value="5">05</option>
                                <option value="6">06</option>
                                <option value="7">07</option>
                                <option value="8">08</option>
                                <option value="9">09</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full justify-between flex items-center flex-wrap font-bold pb-[10px]">
                        
                        
                        {
                            isInCart ?  
                            <Link to={"/cart"}>
                                <p className={`flex items-center justify-center py-[5px] rounded-[3px] flex-grow flex-shrink
                                    border border-[#e11b23] rounded-[4px] cursor-pointer mt-[1rem] duration-500
                                    bc-green text-white hover:bg-white hover:text-[#117a7a] max-md:w-full`}>GO TO CART</p>
                            </Link>
                            :
                            <p className={`flex items-center justify-center py-[5px] rounded-[3px] flex-grow flex-shrink
                                border border-[#e11b23] rounded-[4px] cursor-pointer mt-[1rem] duration-500
                                bg-white text-[#e11b23] hover:bg-[#e11b23] hover:text-white max-md:w-full`} 
                                onClick={() => varifyUserForCart()}>ADD TO CART</p>
                        }
                        

                        <div className={`flex items-center justify-center py-[5px] rounded-[3px] flex-grow flex-shrink 
                             border border-[#117a7a] rounded-[4px] cursor-pointer mt-[1rem] duration-500
                            md:ml-[1rem] ${isInWishlist ? "bc-green text-white hover:bg-white hover:text-[#117a7a]"
                            : "bg-white font-green hover:bg-[#117a7a] hover:text-white"} max-md:w-full`}
                            onClick={() => varifyUserForWhishlist()}>
                            {
                                isInWishlist ?
                                    <p>ADDED TO WISHLIST</p>
                                :
                                    <p>ADD TO WISHLIST</p>
                            }
                        </div>
                    </div>

                    <div className="flex items-center text-[13px] font-grey my-[1rem] p-[10px] border rounded-[10px]
                        xl:px-[2rem]">
                        <div className="flex items-center w-[4rem] h-[4rem]
                            xl:w-[5rem] xl:h-[5rem]"> 
                            <img src="https://tss-static-images.gumlet.io/icons/return-icon.png" alt="No Image"
                                className="w-full" />
                        </div>

                        <p className="pl-[10px] lg:text-[14px] xl:text-[16px] xl:pl-[2rem]">
                            This product is eligible for return or exchange under our 30-day return or exchange policy. No questions asked.
                        </p>
                    </div>
                    

                    <div className="border p-[1rem]" onClick={() => setIsModalOpen((old) => !old)}>
                        <div className="flex items-center justify-between text-[16px] font-bold font-grey
                            lg:text-[17px] xl:text-[19px]">
                            <p>Product Details</p>

                            {
                                isModalOpen ? 
                                    <ChevronUp width={"15px"} height={"15px"} color={"#000000"} />
                                :
                                    <ChevronDown width={"15px"} height={"15px"} color={"#000000"} />
                            }
                        </div>
                        
                        {
                            isModalOpen && 
                                <div className="font-grey text-[13px] my-[1rem]
                                    lg:text-[15px]">
                                    {
                                        parse(`${product?.description}`)
                                    }
                                </div>   
                        }
                    </div>
                </div>     
            </div>
            
            {/* similar products */}
            <div className="w-full xl:max-w-[1500px] flex flex-col justify-between pt-[1rem] md:pt-[3rem]">
                <ProductList url={productUrl.filterProduct + `{"subCategory":"${product.subCategory}", "gender":"Men"}&page=1&limit=20`} 
                    heading={"SIMILAR PRODUCTS"} />
            </div>

            {/* trending products */}
            <div className="w-full xl:max-w-[1500px] flex flex-col justify-between pt-[1rem] md:pt-[3rem]">
                <ProductList url={productUrl.filterProduct + `{"sellerTag":"top rated", "gender":"Men"}&page=1&limit=20`} 
                    heading={"TOP RATED PRODUCTS"} />
            </div>

        </div>
    )
}