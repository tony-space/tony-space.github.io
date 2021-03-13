---
title: "Projects and works"
#permalink: /projects/
permalink: /
toc: true
toc_sticky: true_
header:
  image: /assets/images/projects/splash.jpg
---
## Simple Software Rasterizer
This is just an exercise to consolidate knowledge of homogeneous coordinates and rasterization algorithms.
I've developed a CPU-based software rasterizer on C++17.

<iframe width="560" height="315" src="https://www.youtube.com/embed/blnUOKg35lg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>
<br>

**Supported features**

* Basic obj file support (enough to load the Stanford Bunny).
* Clipping in the homogeneous clip space (before perspective division).
* Parallel tiled rasterization.
* Perspective-correct interpolation of vertex attributes.
* Per-pixel lighting via Lambertian BRDF.
* Gamma correction.
* Screen space shadows

## Airfoil simulation
This is a [DEM-based](https://en.wikipedia.org/wiki/Discrete_element_method) simulation designed to test [the Newtonian lift](https://www.grc.nasa.gov/www/k-12/airplane/bernnew.html) concept.
This simulation doesn't solve the Navier-Stokes equations. But my idea was to roughly replicate the same phenomena the Navier-Stokes equations describe using something simple. Something like a huge bunch of monoatomic molecules.
The simulation crunches 2M particles on the GPU using [a highly parallel approach](https://developer.nvidia.com/blog/thinking-parallel-part-iii-tree-construction-gpu/) to construct [a BVH-acceleration structure](https://en.wikipedia.org/wiki/Bounding_volume_hierarchy).
This BVH-tree is necessary for doing potential collision tests quickly. The collision response is a simple Hooke's law.


<iframe width="560" height="315" src="https://www.youtube.com/embed/YDmFNMMdeBg" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XeFrCLoRJak" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/6w9DpvgZ6_Q" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

More demos can be found on [Youtube](https://www.youtube.com/playlist?list=PLwr8DnSlIMg0KABru36pg4CvbfkhBofAi).

[Github page](https://github.com/tony-space/WingSimulator).

Check [Medium](https://tony-space.medium.com/newtonian-lift-simulation-on-cuda-e368214750fe) / [Habr](https://tony-space.medium.com/newtonian-lift-simulation-on-cuda-e368214750fe) to know more about technical details.

## CUDA-based physics simulations

The project is inspired by the [Intro to parallel programming](https://www.youtube.com/playlist?list=PLAwxTw4SYaPnFKojVQrmyOGFCqHTxfdv2) course by Udacity and some of [GPU Gems 3](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_pref01.html) articles.

<iframe width="560" height="315" src="https://www.youtube.com/embed/s08MgdxT6wg" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/1XhtUBxeYwY" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/R_SuIDaajrw" style="border: none;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

More demos can be found on [Youtube](https://www.youtube.com/playlist?list=PLwr8DnSlIMg0ZdLeu9lJRSsSaU7Z9HqKw).

[Github page](https://github.com/tony-space/learning-cuda)

## Pure WebGL

Stanford Bunny is just a simple WebGL application with an asynchronous loading of the model, vertex and fragment shaders.

Stanford Bunny
The source code

## Physically based modeling
Constrained dynamics simulation is inspired by a Carnegie Mellon University's course.

Constrained dynamics
The main feature of the simulation is that it's using ideal constraints as joints between material points, not springs. The simulation uses the explicit fourth-order Runge-Kutta method in order to solve an ordinary differential equation of the simulation state in the phase space.

If you're keen on the math model the simulation based on, please take a look at 'Constrained Dynamics' lecture.

The source code

## Project R-7 game
This game was made in 2010-2011 for "Sozvezdie" ("Constellation") competition among schoolchildren. One of the rules of the competition was, that competitors were not allowed to use a third-party game engine. So I made it by myself using only C++ and OpenGL. Plus some additional libraries such as GLUT and Audiere.

The physics was simplified a bit because making a detailed simulation was too much for me back in school. But it was enough to get the first prize.

 

I should mention that the game uses some of the assets from Orbiter Space Flight Simulator and Space Shuttle Mission 2007 I couldn't have finished my competition project without these amazing simulators.

The code was way too messy. There won't be a link to it.