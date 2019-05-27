import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'circle-graph',
	styleUrl: 'circle-graph.scss'
})
export class BasfCircleGraph {
	@Prop({ mutable: true })
	slices: any;

	@Prop()
	label: string;
	@Prop()
	type: string;
	@Prop()
	icon: string;
	@Prop()
	iconEmpty: string;
	@Prop()
	empty: boolean = false;

	// @State()
	total: number = 0;

	calculateGraphData() {
		let degStart = 0;
		let total: number = 0;
		this.slices.forEach(slice => {
			total += parseInt(slice.value, 10);
		});
		this.total = total;

		this.slices.forEach(slice => {
			const degRotate = (parseInt(slice.value, 10) / this.total) * 360;
			if (degRotate > 180) {
				slice.big = 'true';
			}
			slice.degStart = degStart.toString() + 'deg';
			slice.degRotate = degRotate.toString() + 'deg';
			slice.centerRotate = (degStart + degRotate / 2).toString() + 'deg';

			slice.antiRotate =
				(360 - parseInt(slice.centerRotate, 10)).toString() + 'deg';
			degStart = degStart + degRotate;
		});
	}

	componentWillLoad() {
		this.calculateGraphData();
	}

	componentWillUpdate() {
		this.calculateGraphData();
	}

	render() {
		if (this.slices && this.slices.length > 0) {
			return (
				<div class="circle-graph" key="key1">
					<div class="pie-chart">
						{this.slices.map(slice => {
							if (slice.value > 0 && !this.empty) {
								return (
									<circle-graph-section
										key="key2"
										degStart={slice.degStart}
										degRotate={slice.degRotate}
										value={slice.value}
										color={slice.color}
										big={slice.big}
									/>
								);
							}
						})}
						<div class="total">
							<div class="total-inner">
								{this.icon &&
									this.total > 0 && <img class="graph-icon" src={this.icon} />}
								{this.icon &&
									this.total === 0 && (
										<img class="graph-icon" src={this.iconEmpty} />
									)}
								{this.type === 'ratio' &&
									this.total > 0 && (
										<span class="total-number">
											{this.slices[0].value.toString() +
												'/' +
												this.total.toString()}
										</span>
									)}
								{(this.type === 'multi' || this.total === 0) && (
									<span class="total-number">{this.total.toString()}</span>
								)}
								<br />
								<span class="total-label">{this.label}</span>
							</div>
						</div>
					</div>
					{this.type === 'multi' && (
						<div class="label-container">
							{this.slices.map(slice => {
								if (slice.value > 0) {
									const labelStyle = {
										'--center-rotate': slice.centerRotate,
										'--anti-rotate': slice.antiRotate
									};
									return (
										<div class="value-label" key="key3" style={labelStyle}>
											<span>{slice.value}</span>
										</div>
									);
								}
							})}
						</div>
					)}
				</div>
			);
		} else {
			return (
				<div class="circle-graph">
					<div class="empty pie-chart">
						<div class="total">
							<div class="total-inner">
								<span class="total-number">{this.total.toString()}</span>
								<br />
								<span class="total-label">{this.label}</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
