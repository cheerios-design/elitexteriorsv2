export const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading mb-8">Our Family Story</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 font-paragraph">
            <p>
              Elite Exteriors is more than just a service provider - we're a
              family-run business bringing international expertise to Hampton
              Roads, Virginia. Founded by husband and wife team Ahmet from
              Turkey and Gaby from Zimbabwe, we blend diverse backgrounds with
              professional excellence.
            </p>
            <p>
              Our services include: • Professional pressure washing • Thorough
              gutter cleaning • Expert Christmas light installation
            </p>
          </div>
          <div>
            <img
              src="/src/assets/images/family-team.jpg"
              alt="Elite Exteriors family team - Ahmet and Gaby"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
