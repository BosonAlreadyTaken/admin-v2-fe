import React from 'react';
// import {Link} from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
// import TableList from 'util/table-list/index.jsx';
import Product from 'service/product-service.jsx';
import MUtil from 'util/mm.jsx';

const _product = new Product();
const _mm = new MUtil();

class CategoryAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            })
        }
    }
    //加载品类列表
    loadCategoryList() {
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    onSubmit(e) {
        let categoryName = this.state.categoryName.trim();
        if(categoryName) {
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName,
            }).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product-category/index')
            }, (errMsg) => {
                _mm.errorTips(errMsg)
            });

        } else {
          _mm.errorTips('请输入品类名称')
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId" className="form-control" onChange={(e) => {this.onValueChange(e)}}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类描述</label>
                                <div className="col-md-5">
                                    <input
                                        value={this.state.subtitle}
                                        type="text" className="form-control"
                                        placeholder="请输入品类名称"
                                        name="categoryName"
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-10 col-md-offset-2">
                                    <button type="submit" className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;