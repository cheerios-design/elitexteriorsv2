export const Gallery = () => {
  return (
    <section
      id="gallery"
      className="bg-white  py-8 antialiased w-full h-fit block md:px-16 md:py-16"
    >
      <div
        id="gallery-content"
        className="mx-auto w-full md:text-left text-center flex flex-col px-4"
      >
        <h2 className="text-sky-900 mb-4 uppercase font-accent font-extrabold tracking-tight leading-none text-6xl ">
          Gallery
        </h2>
        <p className="mb-6 font-paragraph font-light md:mb-8 md:text-lg">
          Explore our gallery to see the stunning transformations we've achieved
          for our clients. Our commitment to quality and attention to detail is
          evident in every project we undertake. Browse through our collection
          of before-and-after images to witness the power of our services.
        </p>
      </div>

      <div className="grid grid-cols-3 items-center w-full md:grid-cols-3 gap-2">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(1).jpg"
            />
          </div>
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(2).jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(3).jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(4).jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(5).jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(6).jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(7).jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(8).jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto saturate-45 hover:saturate-100 max-w-full rounded-lg"
              src="src/assets/images/gallery1(9).jpg"
              alt=""
            />
          </div>
        </div>
        {/*
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="assets/images/gallery1(1).jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="assets/images/gallery1(1).jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="assets/images/gallery1(1).jpg" alt="" />
                    </div>
                </div>
                */}
      </div>
    </section>
  );
};
