
var languages = {
	"English" : {
	"t1": "Topography of Wealth in L.A.",
	"t2": "Visualizing Income Inequality as Terrain",
	"t3": "Los Angeles has 58 billionaires and 58,000 homeless people. In a city where destitution coexists with opulence, vast gaps in opportunity exist between neighborhoods. Let's use physical terrain as a metaphor to visualize income inequality across LA.",
	"t4": "Using 2017 census data, we displace each geographic unit vertically based on median annual household income.",
	"t5": "Low-income neighborhoods sink into canyons, while rich areas soar far above the city as high plateaus.",
	"t6": "We set sea level equal to median US income, $59,000 per year, as a visual reference. Along the coast, affluent neighborhoods with incomes well above the US average form coastal mountain ranges.",
	"t7": "The massive plateaus of the Beverly Hills area are likely even higher, as income estimates at this scale are capped and designated as $250,000+.",
	"t8": "Precipitous terrain reveals the stark inequity within the city. In some places, wealthy neighborhoods with incomes exceeding $250,000 lie immediately adjacent to others with income well below the poverty line.",
	"t9": "The culture of the city reflects this unseen landscape. In particular, it can be heard in the sounds of L.A.'s rap music."

},
 "Español" : {
	"t1": "Topografía de la Riqueza en L.A.",
	"t2": "Visualizando la Desigualdad de Ingresos como Terreno",
	"t3": "Los Angeles tiene 58 billionarios y 58,000 personas sin hogar. En una ciudad dónde la indigencia coexiste con la opulencia, enormes brechas de oportunidades existen entre los barrios. Usemos el terreno físico como una metáfora para visualizar la desigualdad de ingresos en LA.",
	"t4": "Utilizando los datos del censo de 2017, desplazamos cada unidad geográfica verticalmente en función de los ingresos medios anuales de los hogares.",
	"t5": "Los barrios de bajos ingresos se hunden en cañones, mientras que las zonas ricas se elevan por encima de la ciudad como mesetas altas.",
	"t6": "Establecemos el nivel del mar igual al ingreso medio de los Estados Unidos, $59,000 por año, como una referencia visual. Cerca de la costa, los barrios ricos con ingresos muy mayor del promedio de los Estados Unidos forman cordilleras costeras.",
	"t7": "Las mesetas masivas del área de Beverly Hills probablemente están en realidad más altas, ya que las estimaciones de ingresos a esta escala están limitadas y se designan como $250,000+.",
	"t8": "Terreno precipitado revela la desigualdad severa dentro de la ciudad. En algunos lugares, los vecindarios ricos con ingresos que superan los $ 250,000 se encuentran inmediatamente adyacentes a otros con ingresos muy por debajo del umbral de pobreza.",
	"t9": "La cultura de la ciudad refleja este paisaje invisible. En particular, se puede escuchar en los sonidos de la música rap de L.A."

}
};


var languageToggle = d3.select("h5.language").selectAll("span");

languageToggle.on("click", function(d){
		languageToggle.classed("on", function(d){
			return !d3.select(this).classed("on");
		});

		switchLanguage(d3.select(this).text());
})

function switchLanguage(language) {
		for(var textBlock in languages[language]){
			d3.select("."+textBlock).text(languages[language][textBlock]);
		};
}