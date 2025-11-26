import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.jsx";
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
        document.body.style.cursor = '';
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
                        <CarouselItem key={index} className="pl-2 basis-[320px]">
                            <AspectRatio ratio={4/5} className="bg-muted rounded-xl overflow-hidden">
                                <img
                                    onMouseDown={() => handleMouseDown(index)}
                                    onMouseUp={handleMouseUp}
                                    src={img}
                                    alt={`Post Image ${index + 1}`}
                                    className={cn("w-full h-full object-cover transition-transform duration-200 cursor-grab",
                                        index === selectedImageIndex ? "scale-95" : "scale-100")}
                                />
                            </AspectRatio>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        )
    } else if (typeof image === 'string') {
        imageSrc = (
            <div className="w-[320px]">
                <AspectRatio ratio={4/5} className="bg-muted rounded-xl overflow-hidden border border-border">
                    <img
                        src={image}
                        alt="Post Image"
                        className="w-full h-full no-drag object-cover cursor-pointer"
                    />
                </AspectRatio>
            </div>
        );
    }

    return imageSrc;
}

export default PostImage;