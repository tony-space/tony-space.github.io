---
title: "Projects and works"
#permalink: /projects/
permalink: /
toc: true
toc_sticky: true_
header:
  image: /assets/images/projects/splash.jpg
nbodysim:
  - url: /assets/images/projects/galaxies.jpg
    image_path: /assets/images/projects/galaxies.jpg
    alt: "N-body simulation on CUDA"
efield:
  - url: /assets/images/projects/electric-field.png
    image_path: /assets/images/projects/electric-field.png
    alt: "Static Electric Field"
---
A collection of my pet-projects projects.

## Airfoil simulation
This is a [DEM-based](https://en.wikipedia.org/wiki/Discrete_element_method) simulation designed to test [the Newtonian lift](https://www.grc.nasa.gov/www/k-12/airplane/bernnew.html) concept.

The simulation process 2M particles on the GPU using [a highly parallel approach](https://developer.nvidia.com/blog/thinking-parallel-part-iii-tree-construction-gpu/) to construct [a BVH-acceleration structure](https://en.wikipedia.org/wiki/Bounding_volume_hierarchy).
This BVH-tree is necessary for doing potential collision tests quickly. The collision response is a simple Hooke's law.

Supports both CPU and CUDA implementations.

<iframe width="560" height="315" src="https://www.youtube.com/embed/YDmFNMMdeBg" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XeFrCLoRJak" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6w9DpvgZ6_Q" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
More demos on
{% include extlink.html href="https://www.youtube.com/playlist?list=PLwr8DnSlIMg0KABru36pg4CvbfkhBofAi" icon=site.icons.youtube content="Youtube" %}

Check
{% include extlink.html href="https://tony-space.medium.com/newtonian-lift-simulation-on-cuda-e368214750fe" icon=site.icons.medium content="Medium" %} / 
{% include extlink.html href="https://habr.com/ru/post/519032/" icon=site.icons.habr content="Habr" %}
to know more about technical details.

{% include extlink.html href="https://github.com/tony-space/WingSimulator" icon=site.icons.github content="Github page" %} /
{% include extlink.html href="https://github.com/tony-space/WingSimulator/releases/tag/1.0.1" icon=site.icons.github content="Windows binaries" %}

## Simple Software Rasterizer
This is just an exercise to consolidate knowledge of homogeneous coordinates and rasterization algorithms.
I've developed a CPU-based software rasterizer using Parallel STL -- a standard C++17 feature.

<iframe width="560" height="315" src="https://www.youtube.com/embed/blnUOKg35lg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

**Supported features**

* Basic obj file support (enough to load the Stanford Bunny).
* Clipping in the homogeneous clip space (before perspective division).
* Parallel tiled rasterization.
* Perspective-correct interpolation of vertex attributes.
* Per-pixel lighting via Lambertian BRDF.
* Gamma correction.
* Screen space shadows

{% include extlink.html href="https://github.com/tony-space/SimpleSoftwareRasterizer" icon=site.icons.github content="Github page" %} /
{% include extlink.html href="https://github.com/tony-space/SimpleSoftwareRasterizer/releases" icon=site.icons.github content="Windows/Linux binaries" %}

## CUDA-based physics simulations
The project is inspired by the [Intro to parallel programming](https://www.youtube.com/playlist?list=PLAwxTw4SYaPnFKojVQrmyOGFCqHTxfdv2) course by Udacity and some of [GPU Gems 3](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_pref01.html) articles.

### Fast N-Body simulation
Even having *O(N<sup>2</sup>)* complexity the simulation manages to work in real-time processing 16384 particles.
It utilizes the superpowers of Nvidia GPUs such as ultimate parallelism and on-chip shared memory for memory bandwidth improvements.
{% include gallery id="nbodysim" caption="N-body simulation (clickable)" %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/R_SuIDaajrw" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
Based on a GPU Gems 3 [article](https://developer.nvidia.com/gpugems/gpugems3/part-v-physics-simulation/chapter-31-fast-n-body-simulation-cuda).

### Static electrict field simulation
This simulation is based on an electric potential field reconstruction.
{% include gallery id="efield" caption="Static electrict field (clickable)" %}
The field is simply a 2D matrix of vector values.
The matrix is stored in a very specific type of 2D array -- a [Texture memory](http://cuda-programming.blogspot.com/2013/02/texture-memory-in-cuda-what-is-texture.html).
This type of memory provides a better spatial location for euclidian space than a regular C-like 2D array.
<iframe width="560" height="315" src="https://www.youtube.com/embed/s08MgdxT6wg" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Other particle-based simulations
<iframe width="560" height="315" src="https://www.youtube.com/embed/1XhtUBxeYwY" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/pYDWTJo18sE" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
Other stuff is available
{% include extlink.html href="https://www.youtube.com/playlist?list=PLwr8DnSlIMg0ZdLeu9lJRSsSaU7Z9HqKw" icon=site.icons.youtube content="Youtube" %}.

{% include extlink.html href="https://github.com/tony-space/learning-cuda" icon=site.icons.github content="Github page" %}

## Constrained dynamics simulation
"Constrained dynamics simulation" is inspired by the ["Physically Based Modeling: Principles and Practice"](https://www.cs.cmu.edu/~baraff/sigcourse/) course by Carnegie Mellon University.

{% include iframe.html path="assets/js-demos/constrained-dynamics/index.html" teaser="assets/images/projects/constrained.svg" caption="Click to run the demo" w=500 h=320 %}

The **key feature** of the simulation is that it's using **ideal constraints** as joints between material points, **not springs**. The simulation uses the explicit fourth-order Runge-Kutta method in order to solve an ordinary differential equation of the simulation state in the phase space.

If you're keen on the math model the simulation based on, please take a look at [**Constrained Dynamics**](https://www.cs.cmu.edu/~baraff/sigcourse/notesf.pdf) lecture.

{% include extlink.html href="https://github.com/tony-space/physically-based-modeling/tree/master/constrained-dynamics" icon=site.icons.github content="Github page" %}

## Pure WebGL
[Stanford Bunny](https://tony-space.github.io/webgl/demos/bunny/) is just a simple WebGL application with an asynchronous loading of the model, vertex and fragment shaders.

{% include iframe.html path="assets/js-demos/webgl/demos/bunny/index.html" teaser="assets/images/projects/webgl.jpg" caption="Click to run the demo. Use mouse and LMB to navigate." w=600 h=500 %}

{% include extlink.html href="https://github.com/tony-space/webgl" icon=site.icons.github content="Github page" %}

## Project R-7 game
This game was made in 2010-2011 for ["Sozvezdie" ("Constellation")](http://www.olimpsozvezdie.ru/) competition among schoolchildren. One of the rules of the competition was, that competitors were not allowed to use a third-party game engine. So I made it by myself using only C++ and OpenGL. Plus some additional libraries such as GLUT and Audiere.

The physics was simplified because making a detailed simulation was a big deal for me back in school. But it was enough to win the first prize.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pdDCMeKz5og" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Gy8zDOU4IE0" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

I should mention that the game uses some of the assets from [Orbiter Space Flight Simulator](http://orbit.medphys.ucl.ac.uk/) and [Space Shuttle Mission 2007](https://www.space-shuttle-mission.com/).
I couldn't have finished my competition project without these amazing simulators.

The code was way too messy. There won't be a link to it.