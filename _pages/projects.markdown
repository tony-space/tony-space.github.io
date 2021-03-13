---
title: "Projects and works"
#permalink: /projects/
permalink: /
toc: true
toc_sticky: true_
header:
  image: /assets/images/projects/splash.jpg
---
A collection of my pet-projects projects I've worked on just for fun.

## Airfoil simulation
This is a [DEM-based](https://en.wikipedia.org/wiki/Discrete_element_method) simulation designed to test [the Newtonian lift](https://www.grc.nasa.gov/www/k-12/airplane/bernnew.html) concept.
This simulation doesn't solve the Navier-Stokes equations. But my idea was to roughly replicate the same phenomena the Navier-Stokes equations describe using something simple. Something like a huge bunch of monoatomic molecules.
The simulation crunches 2M particles on the GPU using [a highly parallel approach](https://developer.nvidia.com/blog/thinking-parallel-part-iii-tree-construction-gpu/) to construct [a BVH-acceleration structure](https://en.wikipedia.org/wiki/Bounding_volume_hierarchy).
This BVH-tree is necessary for doing potential collision tests quickly. The collision response is a simple Hooke's law.

<iframe width="560" height="315" src="https://www.youtube.com/embed/YDmFNMMdeBg" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XeFrCLoRJak" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6w9DpvgZ6_Q" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

More demos can be found on [Youtube](https://www.youtube.com/playlist?list=PLwr8DnSlIMg0KABru36pg4CvbfkhBofAi).

Check [Medium](https://tony-space.medium.com/newtonian-lift-simulation-on-cuda-e368214750fe) / [Habr](https://habr.com/ru/post/519032/) to know more about technical details.

[Github page](https://github.com/tony-space/WingSimulator).

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

[Github page](https://github.com/tony-space/SimpleSoftwareRasterizer).

## CUDA-based physics simulations

The project is inspired by the [Intro to parallel programming](https://www.youtube.com/playlist?list=PLAwxTw4SYaPnFKojVQrmyOGFCqHTxfdv2) course by Udacity and some of [GPU Gems 3](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_pref01.html) articles.

<iframe width="560" height="315" src="https://www.youtube.com/embed/s08MgdxT6wg" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1XhtUBxeYwY" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/R_SuIDaajrw" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

More demos can be found on [Youtube](https://www.youtube.com/playlist?list=PLwr8DnSlIMg0ZdLeu9lJRSsSaU7Z9HqKw).

[Github page](https://github.com/tony-space/learning-cuda)

## Pure WebGL

[Stanford Bunny](https://tony-space.github.io/webgl/demos/bunny/) is just a simple WebGL application with an asynchronous loading of the model, vertex and fragment shaders.

[Github page](https://github.com/tony-space/webgl)

## Physically based modeling
[Constrained dynamics simulation](https://tony-space.github.io/physically-based-modeling/constrained-dynamics/index.html) is inspired by the ["Physically Based Modeling: Principles and Practice"](https://www.cs.cmu.edu/~baraff/sigcourse/) course by Carnegie Mellon University.

The **key feature** of the simulation is that it's using **ideal constraints** as joints between material points, **not springs**. The simulation uses the explicit fourth-order Runge-Kutta method in order to solve an ordinary differential equation of the simulation state in the phase space.

If you're keen on the math model the simulation based on, please take a look at [**Constrained Dynamics**](https://www.cs.cmu.edu/~baraff/sigcourse/notesf.pdf) lecture.

[Github page](https://github.com/tony-space/physically-based-modeling/tree/master/constrained-dynamics).

## Project R-7 game
This game was made in 2010-2011 for ["Sozvezdie" ("Constellation") competition](http://www.olimpsozvezdie.ru/) among schoolchildren. One of the rules of the competition was, that competitors were not allowed to use a third-party game engine. So I made it by myself using only C++ and OpenGL. Plus some additional libraries such as GLUT and Audiere.

The physics was simplified because making a detailed simulation was a big deal for me back in school. But it was enough to win the first prize.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pdDCMeKz5og" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/Gy8zDOU4IE0" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>

I should mention that the game uses some of the assets from [Orbiter Space Flight Simulator](http://orbit.medphys.ucl.ac.uk/) and [Space Shuttle Mission 2007](https://www.space-shuttle-mission.com/).
I couldn't have finished my competition project without these amazing simulators.

The code was way too messy. There won't be a link to it.