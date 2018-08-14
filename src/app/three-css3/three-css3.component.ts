/// <reference path="../typings/three.d.ts" /> 
/// <reference path="../typings/three-css3drenderer.d.ts" />
/// <reference path="../typings/three-trackballcontrols.d.ts" />
/// <reference path="../typings/tween.js.d.ts" />


import { AfterViewInit, Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';

import * as _ from 'lodash';
import { ThreeCss3Data } from './three-css3-data';

@Component({
  selector: 'app-three-css3',
  templateUrl: './three-css3.component.html',
  styleUrls: ['./three-css3.component.css']
})
export class ThreeCss3Component implements OnInit, AfterViewInit {

  @ViewChild('container') container: any;

  private camera: THREE.PerspectiveCamera;

  @Input()
  threeCss3DataList: Array<ThreeCss3Data>;

  private renderer: THREE.CSS3DRenderer;
  private scene: THREE.Scene;

  private controls: THREE.TrackballControls;

  @Input()
  public rotationSpeedX: number = 0.000;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public size: number = 200;

  @Input()
  public texture: Array<string>;

  @Input()
  public cameraZ: number = 3000;

  @Input()
  public fieldOfView: number = 40;

  @Input('nearClipping')
  public nearClippingPane: number = 1;

  @Input('farClipping')
  public farClippingPane: number = 10000;

  objects: any = [];
  targets: any = { table: [], sphere: [], helix: [], grid: [] };

  // public TWEEN: any;


  private selected = "Table";

  constructor(private elRef:ElementRef) { }

  ngOnInit() {
  }

  /*
   * Create the scene
   */

  private createScene() {

    /* Camera */
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;

    /* Scene */
    this.scene = new THREE.Scene();

    this.scene.add(this.camera);

    // this.camera.position.set(0, 150, 400);
    // this.camera.lookAt(this.scene.position);

    this.camera.position.z = this.cameraZ;

    const axes = new THREE.AxisHelper(100);
    this.scene.add(axes);

    // this.controls = new THREE.OrbitControls(this.camera, this.canvasRef.nativeElement);

    const elements: Array<any> = this.elRef.nativeElement.querySelectorAll('.element');

    elements.forEach((element, index) => {
      let object: any = new THREE.CSS3DObject( element );

      object.position.x = Math.random() * 4000 - 2000;
		  object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;

      this.scene.add( object );

      this.objects.push( object );
      let row = Math.floor(index / 5) + 1;
      let col = Math.floor(index % 5) + 1;

      let object3D: any = new THREE.Object3D();
			// object3D.position.x = (index  * 140) - 100;
      // object3D.position.y = - (index * 180) + 200;
      

      object3D.position.x = ( row * 140 ) - 830;
      object3D.position.y = - ( col * 180 ) + 445;
          
      this.targets.table.push( object3D );
      

    });


		// sphere

		let vector1 = new THREE.Vector3();

		for (let i = 0, l = this.objects.length; i < l; i++) {

			let phi = Math.acos(-1 + (2 * i) / l);
			let theta = Math.sqrt(l * Math.PI) * phi;

			let object1 = new THREE.Object3D();

			object1.position.x = 800 * Math.cos(theta) * Math.sin(phi);
			object1.position.y = 800 * Math.sin(theta) * Math.sin(phi);
			object1.position.z = 800 * Math.cos(phi);

			vector1.copy(object1.position).multiplyScalar(2);

			object1.lookAt(vector1);

			this.targets.sphere.push(object1);

		}

		// helix

		let vector2 = new THREE.Vector3();

		for (let i = 0, l = this.objects.length; i < l; i++) {

			var phi = i * 0.175 + Math.PI;

			var object2 = new THREE.Object3D();

			object2.position.x = 900 * Math.sin(phi);
			object2.position.y = - (i * 8) + 450;
			object2.position.z = 900 * Math.cos(phi);

			vector2.x = object2.position.x * 2;
			vector2.y = object2.position.y;
			vector2.z = object2.position.z * 2;

			object2.lookAt(vector2);

			this.targets.helix.push(object2);

		}

		// grid

		for (let i = 0; i < this.objects.length; i++) {

			var object3 = new THREE.Object3D();

			object3.position.x = ((i % 5) * 400) - 800;
			object3.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
			object3.position.z = (Math.floor(i / 25)) * 1000 - 2000;

			this.targets.grid.push(object3);

		}


    this.renderer = new THREE.CSS3DRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.style.position = 'absolute';
    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
    this.controls.rotateSpeed = 0.5;
    this.controls.minDistance = 500;
    this.controls.maxDistance = 6000;

		var that = this;

		this.controls.addEventListener('change', function () {
			that.renderer.render(that.scene, that.camera);
		});


    this.transform( this.targets.table, 2000 );


    window.addEventListener( 'resize', this.onWindowResize, false );
  }

  private getAspectRatio() {
    // return this.canvas.clientWidth / this.canvas.clientHeight;
    return window.innerWidth / window.innerHeight;
  }



  ngAfterViewInit() {

    const elements = this.elRef.nativeElement.querySelectorAll('.element');
    console.log('elements: ' + elements);
    this.createScene();
    this.animate();
  }

  transform( targets, duration ) {

    TWEEN.removeAll();

    for ( var i = 0; i < this.objects.length; i ++ ) {

      var object = this.objects[ i ];
      var target = targets[ i ];

      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    }
    new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      .onUpdate( this.render )
      .start();

  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.render();
  }

	animate() {

		var that = this;
		setInterval(function () {
			TWEEN.update();
			that.controls.update();
		}, 1000 / 60);


	}

  render() {
      this.renderer.render( this.scene, this.camera );
  }

  showTable(event: any) {
    this.transform( this.targets.table, 2000 );
    this.selected = 'Table';
  }

  showSphere(event: any) {
    this.transform( this.targets.sphere, 2000 );
    this.selected = 'Sphere';
  }

  showHelix(event: any) {
    this.transform( this.targets.helix, 2000 );
    this.selected = 'Helix';
  }

  showGrid(event: any) {
    this.transform( this.targets.grid, 2000 );
    this.selected = 'Grid';
  }
}
