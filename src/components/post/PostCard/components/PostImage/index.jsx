import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.js";

function PostImage({ post }) {
    const image = post?.image && post?.image.length > 0 ? post.image : null;
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    function handleMouseDown(index) {
        setSelectedImageIndex(index);
        document.body.style.cursor = 'grabbing';
    }

    function handleMouseUp() {
        setSelectedImageIndex(null);
    }

    useEffect(() => {
        const handleWindowMouseUp = () => {
            setSelectedImageIndex(null);
            document.body.style.cursor = '';
        }

        if(selectedImageIndex !== null) {
            window.addEventListener('mouseup', handleWindowMouseUp);
        }

        return () => {
            window.removeEventListener('mouseup', handleWindowMouseUp);
        }
    }, [selectedImageIndex]);

    let imageSrc = null;

    if (Array.isArray(image)) {
        imageSrc = (
            <Carousel className="w-full max-w-xl">
                <CarouselContent className="-ml-2">
                    {image.map((img, index) => (
                        <CarouselItem key={index}  className="pl-0.25 lg:basis-xs">
                            <div className="p-1">
                                <img
                                    onMouseDown={() => handleMouseDown(index)}
                                    onMouseUp={handleMouseUp}
                                    src={img}
                                    alt={`Post Image ${index + 1}`}
                                    className={cn("w-full h-[450px] object-cover rounded-xl transition-transform duration-200 cursor-grab",
                                        index === selectedImageIndex ? "scale-95" : "scale-100")}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        )
    } else if (typeof image === 'string') {
        imageSrc = <img src={image} alt="Post Image" className="no-drag w-full h-auto flex rounded-xl cursor-pointer object-cover border border-border"/>;
    }

    return imageSrc;
}

export default PostImage;