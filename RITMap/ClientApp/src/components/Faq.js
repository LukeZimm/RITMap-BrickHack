
const FaqStatement = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container max-w-4xl px-6 py-10 mx-auto">
                <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">FAQ</h1>

                <div className="mt-12 space-y-8">
                    <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                        <button className="flex items-center justify-between w-full p-8">
                            <h1 className="font-semibold text-gray-700 dark:text-white">What data do you store?</h1>
                        </button>

                        <hr className="border-gray-200 dark:border-gray-700"/>

                        <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                            Absolutely nothing. We don't store any IP addresses, browser data, cookies, etc.
                        </p>
                    </div>
                </div>

                <div className="mt-12 space-y-8">
                    <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                        <button className="flex items-center justify-between w-full p-8">
                            <h1 className="font-semibold text-gray-700 dark:text-white">How long do pins stay up?</h1>
                        </button>

                        <hr className="border-gray-200 dark:border-gray-700"/>

                        <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                            Pins remain up permanently for the duration of this project unless they contain slurs, personal data, or anything that could lead to harm.
                        </p>
                    </div>
                </div>

                <div className="mt-12 space-y-8">
                    <div className="border-2 border-gray-100 rounded-lg dark:border-gray-700">
                        <button className="flex items-center justify-between w-full p-8">
                            <h1 className="font-semibold text-gray-700 dark:text-white">What is purpose of this site?</h1>
                        </button>

                        <hr className="border-gray-200 dark:border-gray-700"/>

                        <p className="p-8 text-sm text-gray-500 dark:text-gray-300">
                            This site was made purely for fun but also as a way to provide RIT students with a way to share their unfiltered thoughts about locations on campus. This campus is incredibly large and has a lot of places that not everyone knows about.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
}

export default FaqStatement;