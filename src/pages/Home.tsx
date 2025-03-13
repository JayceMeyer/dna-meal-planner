import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-lg shadow-xl overflow-hidden">
        <div className="container mx-auto px-6 py-12 md:py-20 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Personalized Meal Plans Based on Your DNA
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Discover the perfect diet tailored to your genetic makeup. Upload your DNA information and get customized meal plans that optimize your health.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/dna-upload"
                className="bg-white text-teal-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-center"
              >
                Upload DNA Data
              </Link>
              <Link
                to="/meal-plan"
                className="bg-custom-teal text-white hover:bg-custom-teal-dark font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 text-center"
                style={{ backgroundColor: '#0d9488', color: 'white' }}
              >
                View Sample Meal Plan
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-custom-light p-4 rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Healthy meal"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-custom-light p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-custom-teal-light text-teal-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold mb-3">Upload Your DNA</h3>
            <p className="text-gray-600">
              Upload your raw DNA data from services like 23andMe, AncestryDNA, or other genetic testing providers.
            </p>
          </div>
          <div className="bg-custom-light p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-custom-teal-light text-teal-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold mb-3">Analyze Genetic Markers</h3>
            <p className="text-gray-600">
              Our system analyzes key genetic markers related to nutrition, metabolism, and food sensitivities.
            </p>
          </div>
          <div className="bg-custom-light p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-custom-teal-light text-teal-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold mb-3">Get Personalized Meals</h3>
            <p className="text-gray-600">
              Receive a weekly meal plan tailored to your genetic profile, with recipes and a grocery shopping list.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-custom-gray py-12 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Benefits of DNA-Based Meal Planning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-custom-light p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-teal-700">Optimized Nutrition</h3>
              <p className="text-gray-600">
                Get meals that provide the exact nutrients your body needs based on your genetic profile.
              </p>
            </div>
            <div className="bg-custom-light p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-teal-700">Weight Management</h3>
              <p className="text-gray-600">
                Understand how your body processes different foods to help maintain a healthy weight.
              </p>
            </div>
            <div className="bg-custom-light p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-teal-700">Increased Energy</h3>
              <p className="text-gray-600">
                Fuel your body with the right foods that match your metabolic profile for optimal energy.
              </p>
            </div>
            <div className="bg-custom-light p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-teal-700">Reduced Food Sensitivities</h3>
              <p className="text-gray-600">
                Avoid foods that may cause inflammation or digestive issues based on your genetic markers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 text-center">
        <div className="bg-custom-teal text-white rounded-lg shadow-xl p-8 md:p-12" style={{ backgroundColor: '#0d9488' }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Discover Your Perfect Diet?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Start your journey to personalized nutrition today. Upload your DNA data and get your first customized meal plan in minutes.
          </p>
          <Link
            to="/dna-upload"
            className="bg-white text-teal-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
