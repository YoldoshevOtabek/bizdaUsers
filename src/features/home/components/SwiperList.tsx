"use client"
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperList({ data }: { data: [] }) {
    return (
        <section className="mx-auto w-full max-w-310 px-4">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={data && data.length > 1}
                observer={true}
                observeParents={true}
                watchOverflow={true}
                className="hero-swiper h-64 w-full overflow-hidden rounded-3xl sm:h-80 lg:h-100"
            >
                {data?.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative h-full w-full">
                            {/* Banner image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority
                                className="object-cover"
                            />

                            {/* Gradient overlay — chap tomondan qorong'u,
                                matn o'qilishi uchun */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

                            {/* Text */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="max-w-2xl px-7 text-white sm:px-12 lg:px-16">
                                    <span className="mb-4 inline-block w-fit rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm ring-1 ring-white/25">
                                        Maxsus taklif
                                    </span>

                                    <h2 className="mb-3 text-2xl font-extrabold leading-tight drop-shadow-md sm:text-4xl lg:text-[44px]">
                                        {item.title}
                                    </h2>

                                    <p className="mb-6 max-w-md text-sm text-white/85 sm:text-lg">
                                        {item.subtitle}
                                    </p>

                                    <a
                                        href={item.link}
                                        className="group inline-flex items-center gap-2 rounded-xl bg-[#4caf7d] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-[#3d9c6c] hover:shadow-xl"
                                    >
                                        {item.buttonText}
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
