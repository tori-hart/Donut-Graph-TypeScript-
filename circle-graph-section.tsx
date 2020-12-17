import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'circle-graph-section',
	styleUrl: 'circle-graph-section.scss'
})
export class CircleGraphSection {
	@Prop()
	value: string;
	@Prop()
	color: string;
	@Prop()
	degStart: string;
	@Prop()
	degRotate: string;
	@Prop()
	centerRotate: string;
	@Prop()
	antiRotate: string;
	@Prop()
	big: string;

	// @Prop({ mutable: true })
	sliceStyle: any;

	// @Prop({ mutable: true })
	labelStyle: any;

	calculateStyles() {
		this.sliceStyle = {
			'--deg-start': this.degStart,
			'--deg-rotate': this.degRotate,
			'--center-rotate': this.centerRotate,
			'--anti-rotate': this.antiRotate
		};
		this.labelStyle = {
			'--center-rotate': this.centerRotate,
			'--anti-rotate': this.antiRotate
		};
	}
	componentWillLoad() {
		this.calculateStyles();
	}

	componentWillUpdate() {
		this.calculateStyles();
	}

	render() {
		return (
			<div
				class={this.big === 'true' ? 'slice-container big' : 'slice-container'}
				style={this.sliceStyle}>
				<div class={'slice ' + this.color} />
			</div>
		);
	}
}
