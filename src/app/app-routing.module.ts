import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { AppComponent } from './app.component';
import { CompanyProfileResolver } from './company-profile/company-profile.resolver';
import { LayoutComponent } from './core/layout/layout.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: { profile: CompanyProfileResolver },
    children: [{
      path: 'login',
      loadChildren: () =>
        import('./login/login.module')
          .then(m => m.LoginModule)
    }, {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'my-profile',
          component: MyProfileComponent,
          canActivate: [AuthGuard],
        }, {
          path: 'pos',
          loadChildren: () =>
            import('./pos/pos.module').then(
              m => m.PosModule
            )
        }
        , {
          path: '',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./dashboard/dashboard.module')
              .then(m => m.DashboardModule)
        }, {
          path: 'pages',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./page/page.module')
              .then(m => m.PageModule)
        },
        {
          path: 'roles',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./role/role.module')
              .then(m => m.RoleModule)
        }, {
          path: 'users',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./user/user.module')
              .then(m => m.UserModule)
        }, {
          path: 'login-audit',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./login-audit/login-audit.module')
              .then(m => m.LoginAuditModule)
        },
        {
          path: 'sessions',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./session/session.module')
              .then(m => m.SessionModule)
        },
        {
          path: 'emailtemplate',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./email-template/email-template.module')
              .then(m => m.EmailTemplateModule)
        },
        {
          path: 'message-template',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./message-template/message-template.module')
              .then(m => m.MessageTemplateModule)
        },
        {
          path: 'send-email',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./email-send/email-send.module')
              .then(m => m.EmailSendModule)
        },
        {
          path: 'send-message',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./send-message/send-message.module')
              .then(m => m.SendMessageModule)
        },
        {
          path: 'inbox',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./email-inbox/email-inbox.module')
              .then(m => m.EmailInboxModule)
        },
        {
          path: 'outbox',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./email-outbox/email-outbox.module')
              .then(m => m.EmailOutboxModule)
        },
        {
          path: 'logs',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./n-log/n-log.module')
              .then(m => m.NLogModule)
        },
        {
          path: 'email-smtp',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./email-smtp-setting/email-smtp-setting.module')
              .then(m => m.EmailSmtpSettingModule)
        },
        {
          path: 'supplier',
          loadChildren: () =>
            import('./supplier/supplier.module').then(
              m => m.SupplierModule
            )
        },
        {
          path: 'testimonial',
          loadChildren: () =>
            import('./testimonial/testimonial.module').then(
              m => m.TestimonialModule
            )
        },
        {
          path: 'customer',
          loadChildren: () =>
            import('./customer/customer.module').then(
              m => m.CustomerModule
            )
        },
        {
          path: 'contact-us',
          loadChildren: () =>
            import('./contact-us/contact-us.module').then(
              m => m.ContactUsModule
            )
        },
        {
          path: 'notifications',
          loadChildren: () =>
            import('./notification/notification.module')
              .then(m => m.NotificationModule)
        },
        {
          path: 'reminders',
          loadChildren: () => import('./reminder/reminder.module')
            .then(m => m.ReminderModule)
        },
        {
          path: 'purchase-order',
          loadChildren: () => import('./purchase-order/purchase-order.module')
            .then(m => m.PurchaseOrderModule)
        },
        {
          path: 'purchase-order-return',
          loadChildren: () => import('./purchase-order-return/purchase-order-return.module')
            .then(m => m.PurchaseOrderReturnModule)
        },
        {
          path: 'purchase-order-request',
          loadChildren: () => import('./purchase-order-request/purchase-order-request.module')
            .then(m => m.PurchaseOrderRequestModule)
        }, {
          path: 'sales-order',
          loadChildren: () => import('./sales-order/sales-order.module')
            .then(m => m.SalesOrderModule)
        }
        , {
          path: 'sales-order-return',
          loadChildren: () => import('./sale-order-return/sale-order-return.module')
            .then(m => m.SaleOrderReturnModule)
        },
        {
          path: 'company-profile',
          canLoad: [AuthGuard],
          loadChildren: () =>
            import('./company-profile/company-profile.module')
              .then(m => m.CompanyProfileModule)
        },
        {
          path: 'expense-category',
          loadChildren: () => import('./expense-category/expense-category.module')
            .then(m => m.ExpenseCategoryModule)
        },
        {
          path: 'expense',
          loadChildren: () => import('./expense/expense.module')
            .then(m => m.ExpenseModule)
        },

        {
          path: 'product-category',
          loadChildren: () =>
            import('./product-category/product-category.module').then(
              m => m.ProductCategoryModule
            )
        }, {
          path: 'products',
          loadChildren: () =>
            import('./product/product.module').then(
              m => m.ProductModule
            )
        }, {
          path: 'tax',
          loadChildren: () =>
            import('./tax/tax.module').then(
              m => m.TaxModule
            )
        },  {
          path: 'brand',
          loadChildren: () =>
            import('./brand/brand.module').then(
              m => m.BrandModule
            )
        }, {
          path: 'warehouse',
          loadChildren: () =>
            import('./warehouse/warehouse.module').then(
              m => m.WarehouseModule
            )
        }, {
          path: 'country',
          loadChildren: () =>
            import('./country/country.module').then(
              m => m.CountryModule
            )
        }, {
          path: 'cities',
          loadChildren: () =>
            import('./city/city.module').then(
              m => m.CityModule
            )
        }, {
          path: 'interactions',
          loadChildren: () =>
            import('./inventory/inventory.module').then(
              m => m.InventoryModule
            )
        },
        {
          path: 'interaction-report',
          loadChildren: () =>
            import('./interaction-reports/interaction-reports.module').then(
              m => m.InteractionReportsModule
            )
        },
        {
          path: 'purchase-order-report',
          loadChildren: () =>
            import('./reports/purchase-order-report/purchase-order-report.module').then(
              m => m.PurchaseOrderReportModule
            )
        },
        {
          path: 'sales-order-report',
          loadChildren: () =>
            import('./reports/sales-order-report/sales-order-report.module').then(
              m => m.SalesOrderReportModule
            )
        },
        {
          path: 'purchase-payment-report',
          loadChildren: () =>
            import('./reports/purchase-payment-report/purchase-payment-report.module').then(
              m => m.PurchasePaymentReportModule
            )
        }, {
          path: 'sales-payment-report',
          loadChildren: () =>
            import('./reports/sales-payment-report/sales-payment-report.module').then(
              m => m.SalesPaymentReportModule
            )
        }, {
          path: 'sales-purchase-report',
          loadChildren: () =>
            import('./reports/sales-purchase-report/sales-purchase-report.module').then(
              m => m.SalesPurchaseReportModule
            )
        },{
          path: 'expense-report',
          loadChildren: () =>
            import('./reports/expense-report/expense-report.module').then(
              m => m.ExpenseReportModule
            )
        }, {
          path: 'supplier-payment-report',
          loadChildren: () =>
            import('./reports/supplier-payments/supplier-payments.module').then(
              m => m.SupplierPaymentsModule
            )
        }, {
          path: 'customer-payment-report',
          loadChildren: () =>
            import('./reports/customer-payment-report/customer-payment-report.module').then(
              m => m.CustomerPaymentReportModule
            )
        }, {
          path: 'product-purchase-report',
          loadChildren: () =>
            import('./reports/product-purchase-report/product-purchase-report.module').then(
              m => m.ProductPurchaseReportModule
            )
        }, {
          path: 'product-sales-report',
          loadChildren: () =>
            import('./reports/product-sales-report/product-sales-report.module').then(
              m => m.ProductSalesReportModule
            )
        }, {
          path: 'stock-report',
          loadChildren: () =>
            import('./reports/stock-report/stock-report.module').then(
              m => m.StockReportModule
            )
        },{
          path: 'profit-loss-report',
          loadChildren: () =>
            import('./reports/profit-loss-report/profit-loss-report.module').then(
              m => m.ProfitLossReportModule
            )
        }, {
          path: 'interaction',
          loadChildren: () =>
            import('./unit-conversation/unit-conversation.module').then(
              m => m.UnitConversationModule
            )
        },
        {
          path: 'cti-users',
          loadChildren: () =>
            import('./cti-users/cti-users.module').then(
              m => m.CtiUsersModule
            )
        },
        
        {
          path: 'warehouse-report',
          loadChildren: () =>
            import('./reports/warehouse-stock-report/warehouse-stock-report.module').then(
              m => m.WarehouseStockReportModule
            )
        },{
          path: 'product-warehouse-report',
          loadChildren: () =>
            import('./reports/product-warehouse-report/product-warehouse-report.module').then(
              m => m.ProductWarehouseReportModule
            )
        },{
          path: 'team',
          loadChildren: () =>
            import('./queue/queue.module').then(
              m => m.QueueModule
            )
        }, 
        {
          path: 'lookup',
          loadChildren: () =>
            import('./lookup/lookup.module').then(
              m => m.LookupModule
            )
        }, 
        {
          path: 'problem',
          loadChildren: () =>
            import('./problem/problem.module').then(
              m => m.ProblemModule
            )
        }, 
        {
          path: 'calendar',
          loadChildren: () =>
            import('./calendar/calendar.module').then(
              m => m.CalendarModule
            )
        }, 
        {
          path: 'lookup12',
          loadChildren: () =>
            import('./disposition/disposition.module').then(
              m => m.DispositionModule
            )
        }, 
        {
          path: 'disposition',
          loadChildren: () =>
            import('./disposition/disposition.module').then(
              m => m.DispositionModule
            )
        }, 
        {
          path: 'escalation',
          loadChildren: () =>
            import('./escalation/escalation.module').then(
              m => m.EscalationModule
            )
        }, 
        {
          path: '**',
          redirectTo: '/'
        }

      ]
    },]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'legacy'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
